#-*- coding: utf-8 -*-
import time
import requests
from bs4 import BeautifulSoup


req = requests.get("https://www.youtube.com/results?search_query=%EC%86%A1%EC%8A%B9%ED%97%8C") #connection
#req = requests.get("http://datalab.naver.com/keyword/realtimeList.naver?where=main")
html =  req.text # naver에서 소스를 받아오기

# BeautifulSoup로 html 소스를 python 객체로 변경할 수 있다.
#  첫 인자에는 html 소스코드를 가져온다. 두번째 인자에는 어떤 parser를 이용할지 정해준다.

#---------------------------------------------------------#
#python 내장 함수 html.parser
time.sleep(30)
soup = BeautifulSoup(html, 'html.parser')


print(soup)