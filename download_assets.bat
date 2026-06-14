@echo off
REM SovereignAqua Asset Quick Uploader (Windows)
REM Simple batch script for downloading assets

echo.
echo ============================================
echo     SovereignAqua Asset Downloader
echo ============================================
echo.

REM Create temp directory
if not exist "temp_assets" mkdir temp_assets

echo Downloading Images...
echo.

REM Water Infrastructure
echo Downloading water.jpg...
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://images.unsplash.com/photo-1533496617326-56a1fbd85b17?w=1920&q=80', 'temp_assets/water.jpg')"
echo [OK] water.jpg

REM Environmental Sustainability
echo Downloading environment.jpg...
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80', 'temp_assets/environment.jpg')"
echo [OK] environment.jpg

REM Humanitarian Aid
echo Downloading humanitarian.jpg...
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1920&q=80', 'temp_assets/humanitarian.jpg')"
echo [OK] humanitarian.jpg

REM Asset Management
echo Downloading asset-management-4k.jpg...
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80', 'temp_assets/asset-management-4k.jpg')"
echo [OK] asset-management-4k.jpg

echo.
echo ============================================
echo     Downloaded! Ready for Upload
echo ============================================
echo.
echo Next Steps:
echo 1. Open: https://github.com/emenoghaebube21-eng/sovereignaqua-research-and-development-foundation.website
echo 2. Navigate to assets/images/
echo 3. Click 'Add file' then 'Upload files'
echo 4. Drag files from temp_assets folder
echo 5. Commit changes
echo.
pause
