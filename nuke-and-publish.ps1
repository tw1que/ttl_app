# save als: nuke-and-publish.ps1
[CmdletBinding()]
param(
  [string]$MonorepoPath = "C:\Users\ttlke\Documents\Jim\__code\ttl_app",
  [string]$RemoteUrl    = "https://github.com/tw1que/ttl_app.git",
  [switch]$WipeTags     # verwijder ook alle tags op de remote
)

$ErrorActionPreference = "Stop"
$Git = (Get-Command git.exe -ErrorAction Stop).Source

# 1) Init of hergebruik lokale repo
if (-not (Test-Path $MonorepoPath)) { throw "Pad bestaat niet: $MonorepoPath" }
if (-not (Test-Path (Join-Path $MonorepoPath ".git"))) {
  & $Git init "$MonorepoPath" | Out-Null
}

# 2) Alles toevoegen als snapshot
& $Git -C "$MonorepoPath" add -A
if (& $Git -C "$MonorepoPath" status --porcelain) {
  & $Git -C "$MonorepoPath" commit -m "Monorepo snapshot" | Out-Null
} elseif (-not (& $Git -C "$MonorepoPath" rev-parse --verify HEAD 2>$null)) {
  & $Git -C "$MonorepoPath" commit --allow-empty -m "Init" | Out-Null
}

# 3) Eén branch: main
try { & $Git -C "$MonorepoPath" branch -M main } catch { & $Git -C "$MonorepoPath" checkout -B main }

# 4) Alle lokale refs opschonen voor mirror
# verwijder alle lokale branches behalve main
(& $Git -C "$MonorepoPath" for-each-ref --format="%(refname:short)" refs/heads) |
  ? { $_ -ne "main" } | % { & $Git -C "$MonorepoPath" branch -D $_ }
# optioneel: verwijder alle lokale tags
if ($WipeTags) {
  (& $Git -C "$MonorepoPath" tag) | % { & $Git -C "$MonorepoPath" tag -d $_ }
}

# 5) Remote origin keihard instellen
if (& $Git -C "$MonorepoPath" remote | Select-String -SimpleMatch "origin") {
  & $Git -C "$MonorepoPath" remote set-url origin "$RemoteUrl"
} else {
  & $Git -C "$MonorepoPath" remote add origin "$RemoteUrl"
}

# 6) MIRROR PUSH met force: remote wordt exact gelijk aan lokaal
& $Git -C "$MonorepoPath" push --mirror --force origin

# 7) HEAD en default branch netjes zetten
try { & $Git -C "$MonorepoPath" remote set-head origin -a | Out-Null } catch {}

Write-Host "Remote volledig overschreven met lokale inhoud: $RemoteUrl (branch: main)"
if ($WipeTags) { Write-Host "Opmerking: alle remote tags zijn verwijderd." }
