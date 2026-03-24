# PowerShell script to remove merge conflicts and keep the newer version (after =======)
Get-ChildItem -Recurse -Include *.js,*.jsx,*.json | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "<<<<<<< HEAD") {
        Write-Host "Processing file: $($_.FullName)"
        
        # Remove everything between "<<<<<<< HEAD" and "=======" (inclusive)
        $content = $content -replace "(<<<<<<< HEAD[\s\S]*?=======)", ""
        
        # Remove everything between ">>>>>>> [commit]" and the next "<<<<<<< HEAD" or end of file
        $content = $content -replace "(>>>>>>> .+?[\s\S]*?(?=<<<<<<< HEAD|\\z))", ""
        
        # Remove any remaining ">>>>>>> [commit]" lines
        $content = $content -replace ">>>>>>> .+", ""
        
        # Write the cleaned content back to the file
        Set-Content $_.FullName $content
        Write-Host "Cleaned merge conflicts in $($_.FullName)"
    }
}