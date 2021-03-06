import time
import requests
import sys
from bs4 import BeautifulSoup

inputText = ''

for i in range(1,len(sys.argv)):
    inputText = sys.argv[i]


def main():
    print(inputText)
    req = requests.get("https://search.naver.com/search.naver?sm=tab_hty.top&where=image&query=" + inputText) #connection
    #req = requests.get("http://datalab.naver.com/keyword/realtimeList.naver?where=main")
    time.sleep(1)
    html =  req.text # naver에서 소스를 받아오기

    # BeautifulSoup로 html 소스를 python 객체로 변경할 수 있다.
    #  첫 인자에는 html 소스코드를 가져온다. 두번째 인자에는 어떤 parser를 이용할지 정해준다.

    #---------------------------------------------------------#
    #python 내장 함수 html.parser
    time.sleep(1)
    soup = BeautifulSoup(html, 'html.parser')
    sillsigan = soup.select('div.photo_grid > div.img_area')
    
    crawling(sillsigan)

def crawling(sillsigan):



    if(len(sillsigan) == 0):
        print('len 0')
        time.sleep(5)
        main()
        #crawling(sillsigan)
        
    else:
        for sill in sillsigan:
            # print(sill)
            print(sill.select('a > img')[0].get('data-source').encode("utf-8"))
    

main()