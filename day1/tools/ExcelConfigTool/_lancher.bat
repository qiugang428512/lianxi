@echo off

set fromconfig=D:\WORKING\weixin_xiaoyouxi\xiaochengxu\�Ҳ�ͬ\design\config
set toconfig=D:\WORKING\weixin_xiaoyouxi\xiaochengxu\�Ҳ�ͬ\code\client\bin\res\config
set codeconfig=D:\WORKING\weixin_xiaoyouxi\xiaochengxu\�Ҳ�ͬ\design\config

color 1f

del /f /s /q client\*.*

xcopy /y /e /h %fromconfig% %CD%\

loader.exe --input ./ --clt client/ --timeout -1 --suffix .xlsx --swriter lua --cwriter json

cd client

start /wait winrar a -afzip config *.json

copy config.zip %toconfig%
@echo copy *.ts %codeconfig%

pause