import time
import requests
import sys
from bs4 import BeautifulSoup

inputText = ''

for i in range(1,len(sys.argv)):
    inputText = sys.argv[i]
print(inputText)

req = requests.get("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=" + inputText + "&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=29&start=0&refresh_start=0") #connection
#req = requests.get("http://datalab.naver.com/keyword/realtimeList.naver?where=main")
time.sleep(2)
html =  req.text # naver에서 소스를 받아오기

# BeautifulSoup로 html 소스를 python 객체로 변경할 수 있다.
#  첫 인자에는 html 소스코드를 가져온다. 두번째 인자에는 어떤 parser를 이용할지 정해준다.

#---------------------------------------------------------#
#python 내장 함수 html.parser
time.sleep(5)
soup = BeautifulSoup(html, 'html.parser')
sillsigan = soup.select('div.sp_keyword > dl > dd > ul > li')

news = soup.select('div.news > ul > li')

for sill in sillsigan:
    print(sill.text)
print(len(news))
for new in news:
    print('new href', new.select('dl > dt > a')[0].text)
    print(new.select('div.thumb > a')[0].get('href').encode("utf-8"))
    print(new.select('div.thumb > a > img')[0].get('src').encode("utf-8"))

#print(sillsigan)