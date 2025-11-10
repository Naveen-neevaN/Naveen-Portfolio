@echo off
REM Safe cleanup script for Windows cmd.exe
REM Removes .next, out and node_modules if they exist.

echo Running repo cleanup...

if exist .next (
  echo Removing .next ...
  rmdir /s /q .next
  if errorlevel 1 (echo Failed to remove .next) else (echo Removed .next)
) else (
  echo .next not found; skipping.
)

if exist out (
  echo Removing out ...
  rmdir /s /q out
  if errorlevel 1 (echo Failed to remove out) else (echo Removed out)
) else (
  echo out not found; skipping.
)

if exist node_modules (
  echo Removing node_modules ...
  rmdir /s /q node_modules
  if errorlevel 1 (echo Failed to remove node_modules) else (echo Removed node_modules)
) else (
  echo node_modules not found; skipping.
)

echo Cleanup done.

