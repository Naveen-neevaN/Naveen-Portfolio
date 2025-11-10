# Scan src for files that likely have no references
$files = Get-ChildItem -Recurse -File src | Where-Object { $_.Extension -in '.js','.jsx','.ts','.tsx','.css' }
$unused = @()
foreach ($f in $files) {
  $name = $f.Name
  $base = [IO.Path]::GetFileNameWithoutExtension($name)
  # Search for either the filename or the basename in all src files
  $matches = Select-String -Path "src\**\*.*" -Pattern $name, $base -SimpleMatch -ErrorAction SilentlyContinue
  # Exclude matches that are inside the file itself
  $others = $matches | Where-Object { $_.Path -ne $f.FullName }
  if (-not $others) { $unused += $f.FullName }
}
if ($unused.Count -gt 0) {
  Write-Output '--- UNUSED FILES (candidate list) ---'
  $unused | ForEach-Object { Write-Output $_ }
  $unused | Out-File -FilePath .git\tmp-unused-files.txt -Encoding utf8
  Write-Output 'WROTE .git/tmp-unused-files.txt'
} else {
  Write-Output 'No unused files detected.'
}
