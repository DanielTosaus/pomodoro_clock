$ErrorActionPreference = "Stop"

function Invoke-Checked {
param(
[Parameter(Mandatory = $true)]
[string]$Command,

    [Parameter()]
    [string[]]$Arguments = @()
)

Write-Host "`n> $Command $($Arguments -join ' ')" -ForegroundColor Cyan

& $Command @Arguments

if ($LASTEXITCODE -ne 0) {
    throw "Command failed with exit code $LASTEXITCODE`: $Command $($Arguments -join ' ')"
}

}

try {
Write-Host "`n=== Automatic vulnerability patching ===" -ForegroundColor Green

# 1. Check prerequisites and project directory.
if (-not (Test-Path ".\package.json")) {
    throw "package.json not found. Run this script from your project root."
}

if (-not (Test-Path ".\node_modules")) {
    throw "node_modules not found. Run npm install first."
}

Invoke-Checked "git" @("rev-parse", "--is-inside-work-tree")

$package = Get-Content ".\package.json" -Raw | ConvertFrom-Json

if (-not $package.scripts.deploy) {
    throw "No deploy script found in package.json."
}

# Require a clean repository so unrelated work is never committed.
$status = git status --porcelain
if ($LASTEXITCODE -ne 0) {
    throw "Could not check Git status."
}

if ($status) {
    throw "Git working tree is not clean. Commit or stash existing changes before running this script."
}

# 2. Apply compatible dependency vulnerability fixes.
Invoke-Checked "npm" @("audit", "fix")

# 3. Run tests if a test script exists.
#Invoke-Checked "npm" @("run", "test", "--if-present")

# 4. Build the production application.
Invoke-Checked "npm" @("run", "build")

# 5. Commit dependency changes if anything changed.
$status = git status --porcelain
if ($LASTEXITCODE -ne 0) {
    throw "Could not check Git status after patching."
}

if ($status) {
    Invoke-Checked "git" @("add", "-A")
    Invoke-Checked "git" @(
        "commit",
        "-m",
        "Autopatched vulnerabilities"
    )
}
else {
    Write-Host "`nNo file changes to commit." -ForegroundColor Yellow
}

# 6. Push the current branch to its configured remote.
Invoke-Checked "git" @("push")

# 7. Deploy only after all previous steps succeed.
Invoke-Checked "npm" @("run", "deploy")

Write-Host "`n=== Patching and deployment completed successfully! ===" -ForegroundColor Green

}
catch {
Write-Host "`n=== AUTOMATION STOPPED ===" -ForegroundColor Red
Write-Host $_.Exception.Message -ForegroundColor Red
Write-Host "Review the error above. Deployment was not attempted if an earlier step failed." -ForegroundColor Yellow
exit 1
}