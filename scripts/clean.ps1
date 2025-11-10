<#
Safely remove common build artifacts and node_modules.

This script is idempotent and non-interactive. It only removes known build
output folders if they exist: .next, out, and node_modules. It prints what it
removed so you can confirm. Use with caution — removing node_modules requires
re-running `npm install` to restore dependencies.
#>

Write-Output "Running repo cleanup..."

$targets = @('.next', 'out', 'node_modules')

foreach ($t in $targets) {
    $full = Join-Path -Path (Get-Location) -ChildPath $t
    if (Test-Path $full) {
        Write-Output "Removing $t ..."
        try {
            Remove-Item -LiteralPath $full -Recurse -Force -ErrorAction Stop
            Write-Output "Removed: $t"
        } catch {
            Write-Warning "Failed to remove $t: $_"
        }
    } else {
        Write-Output "$t not found; skipping."
    }
}

Write-Output "Cleanup done."
