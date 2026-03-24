import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute, FaPhoneSlash } from 'react-icons/fa'

const DoctorCall = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const pcRef = useRef(null)
  const socketRef = useRef(null)
  const localStreamRef = useRef(null)
  const cleanupRef = useRef(false)

  // Toggle microphone mute/unmute
  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !isMuted
      })
      setIsMuted(!isMuted)
    }
  }

  // Toggle speaker on/off
  const toggleSpeaker = () => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.muted = !isSpeakerOn
      setIsSpeakerOn(!isSpeakerOn)
    }
  }

  // Cleanup function
  const cleanup = () => {
    if (cleanupRef.current) return
    cleanupRef.current = true
    
    try { 
      if (pcRef.current) {
        pcRef.current.close()
        pcRef.current = null
      }
    } catch (err) {
      console.error('Error closing peer connection:', err)
    }
    
    try { 
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    } catch (err) {
      console.error('Error disconnecting socket:', err)
    }
    
    try {
      const stream = localVideoRef.current?.srcObject
      if (stream) {
        stream.getTracks().forEach(t => {
          try {
            t.stop()
          } catch (err) {
            console.error('Error stopping track:', err)
          }
        })
      }
    } catch (err) {
      console.error('Error stopping stream tracks:', err)
    }
    
    try {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null
      }
    } catch (err) {
      console.error('Error clearing video sources:', err)
    }
  }

  // End the call
  const endCall = () => {
    if (socketRef.current) {
      const roomId = `appt_${appointmentId}`
      socketRef.current.emit('end-call', { roomId })
    }
    
    // Clean up resources
    cleanup()
    
    // Navigate back to appointments
    setTimeout(() => {
      navigate('/doctor/appointments', { replace: true })
    }, 100)
  }

  useEffect(() => {
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        localStreamRef.current = stream
        if (localVideoRef.current) localVideoRef.current.srcObject = stream

        const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
        pcRef.current = pc
        stream.getTracks().forEach(t => pc.addTrack(t, stream))
        pc.ontrack = (e) => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0]
        }
        pc.onicecandidate = (e) => {
          if (e.candidate && socketRef.current) {
            const roomId = `appt_${appointmentId}`
            socketRef.current.emit('signal', { roomId, data: { type: 'candidate', candidate: e.candidate } })
          }
        }

        const socket = io(import.meta.env.VITE_BACKEND_URL || window.location.origin, { transports: ['websocket'] })
        socketRef.current = socket

        socket.on('connect', () => {
          const roomId = `appt_${appointmentId}`
          socket.emit('join-room', { roomId, role: 'doctor' })
        })

        socket.on('peer-joined', async () => {
          if (!pcRef.current) return
          
          try {
            const offer = await pc.createOffer()
            await pc.setLocalDescription(offer)
            const roomId = `appt_${appointmentId}`
            socket.emit('signal', { roomId, data: { type: 'offer', sdp: offer } })
          } catch (err) {
            console.error('Error creating offer:', err)
            setError(err.message || 'Failed to create offer')
          }
        })

        socket.on('signal', async ({ data }) => {
          if (!pcRef.current) return
          
          try {
            if (data.type === 'answer') {
              await pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
              setConnected(true)
            } else if (data.type === 'candidate') {
              try { await pc.addIceCandidate(new RTCIceCandidate(data.candidate)) } catch (err) {
                console.warn('Error adding ICE candidate:', err)
              }
            }
          } catch (err) {
            console.error('Error handling signal:', err)
            setError(err.message || 'Signaling error')
          }
        })

        socket.on('call-ended', () => {
          setConnected(false)
          cleanup()
          // Navigate back to appointments with a small delay to ensure cleanup
          setTimeout(() => {
            navigate('/doctor/appointments', { replace: true })
          }, 100)
        })

        socket.on('disconnect', () => {
          setConnected(false)
        })

        socket.on('error', (err) => {
          console.error('Socket error:', err)
          setError(err.message || 'Connection error')
        })
      } catch (err) {
        console.error('Error starting call:', err)
        setError(err.message || 'Failed to start media')
        // Navigate back to appointments if we can't start the call
        setTimeout(() => {
          navigate('/doctor/appointments', { replace: true })
        }, 2000)
      }
    }

    start()

    // Cleanup on unmount
    return () => {
      cleanup()
    }
  }, [appointmentId, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Doctor Video Consultation</h1>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
            <span className="text-white font-medium">
              {connected ? 'Connected' : 'Waiting for patient...'}
            </span>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Local Video (Doctor) */}
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              You (Doctor)
            </div>
          </div>
          
          {/* Remote Video (Patient) */}
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              Patient
            </div>
            {!connected && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white font-medium">Waiting for patient to join...</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Call Controls */}
        <div className="flex justify-center items-center space-x-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl">
          {/* Mute/Unmute Button */}
          <button 
            onClick={toggleMute}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isMuted 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30' 
                : 'bg-gray-700 hover:bg-gray-600 text-white shadow-lg'
            }`}
            disabled={!localStreamRef.current}
            title={isMuted ? "Unmute microphone" : "Mute microphone"}
          >
            {isMuted ? (
              <FaMicrophoneSlash className="w-6 h-6" />
            ) : (
              <FaMicrophone className="w-6 h-6" />
            )}
            <span className="text-xs mt-1">{isMuted ? 'Muted' : 'Mute'}</span>
          </button>
          
          {/* Speaker Toggle */}
          <button 
            onClick={toggleSpeaker}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isSpeakerOn 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-gray-700 hover:bg-gray-600 text-white shadow-lg'
            }`}
            disabled={!remoteVideoRef.current}
            title={isSpeakerOn ? "Mute speaker" : "Unmute speaker"}
          >
            {isSpeakerOn ? (
              <FaVolumeUp className="w-6 h-6" />
            ) : (
              <FaVolumeMute className="w-6 h-6" />
            )}
            <span className="text-xs mt-1">{isSpeakerOn ? 'On' : 'Off'}</span>
          </button>
          
          {/* End Call Button */}
          <button 
            onClick={endCall}
            className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all duration-300 transform hover:scale-110"
            title="End call"
          >
            <FaPhoneSlash className="w-6 h-6" />
            <span className="text-xs mt-1">End</span>
          </button>
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Secure video consultation in progress</p>
        </div>
      </div>
    </div>
  )
}

export default DoctorCall