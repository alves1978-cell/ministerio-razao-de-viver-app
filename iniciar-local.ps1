param(
  [int]$Port = 8080,
  [switch]$NoBrowser
)

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Prefix = "http://127.0.0.1:$Port/"

$MimeTypes = @{
  ".html"        = "text/html; charset=utf-8"
  ".css"         = "text/css; charset=utf-8"
  ".js"          = "application/javascript; charset=utf-8"
  ".json"        = "application/json; charset=utf-8"
  ".webmanifest" = "application/manifest+json; charset=utf-8"
  ".png"         = "image/png"
  ".jpg"         = "image/jpeg"
  ".jpeg"        = "image/jpeg"
  ".svg"         = "image/svg+xml"
  ".ico"         = "image/x-icon"
  ".webp"        = "image/webp"
}

$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add($Prefix)
$Listener.Start()

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Yellow
Write-Host "  Ministerio Razao de Viver - Servidor Local do App (PWA) " -ForegroundColor Yellow
Write-Host "  Acesse: $Prefix" -ForegroundColor Green
Write-Host "  Pressione Ctrl+C para encerrar.                         " -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Yellow
Write-Host ""

if (-not $NoBrowser) {
  Start-Process $Prefix
}

try {
  while ($Listener.IsListening) {
    $Context = $Listener.GetContext()
    $ReqPath = $Context.Request.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($ReqPath)) { $ReqPath = "index.html" }

    $SafePath = $ReqPath -replace '/', '\'
    $FullPath = Join-Path $Root $SafePath

    if (-not (Test-Path $FullPath -PathType Leaf)) {
      $Context.Response.StatusCode = 404
      $NotFound = [System.Text.Encoding]::UTF8.GetBytes("404 - Arquivo nao encontrado")
      $Context.Response.OutputStream.Write($NotFound, 0, $NotFound.Length)
      $Context.Response.Close()
      continue
    }

    $Ext = [System.IO.Path]::GetExtension($FullPath).ToLowerInvariant()
    $ContentType = if ($MimeTypes.ContainsKey($Ext)) { $MimeTypes[$Ext] } else { "application/octet-stream" }
    $Bytes = [System.IO.File]::ReadAllBytes($FullPath)

    $Context.Response.StatusCode = 200
    $Context.Response.ContentType = $ContentType
    $Context.Response.ContentLength64 = $Bytes.Length
    $Context.Response.Headers.Add("Cache-Control", "no-cache")
    $Context.Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
    $Context.Response.Close()
  }
} finally {
  $Listener.Stop()
  $Listener.Close()
}
