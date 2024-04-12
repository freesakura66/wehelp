#Task1
print("task1 result")
def find_and_print(messages, current_station):
    #建立綠線捷運站點資訊【green_station】
    green_station = ["Songshan", "Nanjing Sanmin", "Taipei Arena", "Nanjing Fuxing", "Songjiang Nanjing", "Zhongshan", "Beimen", "Ximen", "Xiaonanmen", "Chiang Kai-Shek Memorial Hall", "Guting", "Taipower Building", "Gongguan", "Wanlong", "Jingmei", "Dapinglin", "Qizhang", "Xindian City Hall", "Xindian"]    
    #建立存放朋友和其所在車站的空字典【friend_stations】
    friend_stations = {}
    #指定字典【messages】中key值為friend且Value值為message
    #//-賦予字典key和value的方式
    for friend, message in messages.items():
        #指定串列【station】內資料為串列【green_station】內的資料再加上支線站點"Xiaobitan"
        for station in green_station + ["Xiaobitan"]:
            #若字典【messages】的value值message中有包含串列【station】的資料
            if station in message:
                #將字典【messages】內的friend提取出來作為字典【friend_stations】的key
                #將從字典【messages】內的message提取出來的station作為字典【friend_stations】的value
                #//-字典[key]=value >>>條件式將key:value放入字典
                friend_stations[friend] = station
                #此段code假設一條訊息只會提到一個站名，因此一旦在message中找到station就停止if迴圈
                break

    # 建立一個可放入key值為朋友value值為距離的空字典【distances】
    distances = {}
    #在字典【friend_stations】內瀏覽各項key值friend和value值station的資料
    for friend, station in friend_stations.items():
        #若朋友所在位置和我在的位置都在"Xiaobitan"的狀況
        if station == "Xiaobitan" and current_station=="Xiaobitan":
            distance = abs(green_station.index("Qizhang") - green_station.index("Qizhang")) 
        #朋友在"Xiaobitan"而我不在"Xiaobitan"的狀況
        elif station == "Xiaobitan":
            distance = abs(green_station.index(current_station) - green_station.index("Qizhang")) +1
        #朋友不在"Xiaobitan"而我在"Xiaobitan"的狀況
        elif current_station=="Xiaobitan":
            distance = abs(green_station.index("Qizhang") - green_station.index(station))
        #正常不考慮支線"Xiaobitan"的狀況
        else:
            distance = abs(green_station.index(current_station) - green_station.index(station))
        #將friend:distance加入到字典【distances】中
        distances[friend] = distance

    # 若字典【distances】並非空字典時
    if distances:
        #將【distances】內的最小distance存入參數min_distance中
        min_distance = min(distances.values())
        #//-條件表達式[(expression) for (item) in (iterable) if (condition)]
        #//-在iterable中尋找符合condition的item並以expression的形式輸出
        #將字典【distances】中的friend和distance做比對，將擁有最低distance的friend提取出來放進closest_friends
        closest_friends = [friend for friend, distance in distances.items() if distance == min_distance]
        #若只有一個closest_friends就印出來
        if len(closest_friends) == 1:
            closest_friend = closest_friends[0]
            print(closest_friend)
        #若有多個擁有最短距離的朋友就印出來"沒有人特別靠近你"
        else:
            print("沒有人特別靠近你")
    #若字典【distances】為空字典代表字典【messages】內容為空，印出"No Messages"
    else:
        print("No Messages")

# 代碼測試
messages = {
    "Leslie": "I'm at home near Xiaobitan station.",
    "Bob": "I'm at Ximen MRT station.",
    "Mary": "I have a drink near Jingmei MRT station.",
    "Copper": "I just saw a concert at Taipei Arena.",
    "Vivian": "I'm at Xindian station waiting for you."
}

find_and_print(messages, "Wanlong")
find_and_print(messages, "Songshan")
find_and_print(messages, "Qizhang")
find_and_print(messages, "Ximen")
find_and_print(messages, "Xindian City Hall")

#task2
print("task2 result")
def book(consultants, hour, duration, criteria):
    #建立一個代表可用顧問名單的空串列【available_consultants】
    available_consultants = []
    #這段話代表串列【consultants】內的資料為consultant
    #這裡的【consultant】依題目是一個代表顧問資料的字典
    #【consultant】包含顧問的姓名、評級、價位和我們後來添加的行程字典
    #因此這個動作為將串列【consultants】內的每個顧問資料字典【consultant】拿出來進行下列迴圈
    for consultant in consultants:
        #建立一個布林值容器booked
        #先假設該顧問未被預約(False)
        booked = False
        #預約要求book指令下來後依照顧客指定諮詢時間在字典【consultant】中的key="schedule"進行檢查
        for i in range(hour, hour + duration):
            #若指定諮詢時間已經在schedule字典內表示該段時間已被預訂則將booked的布林值改成True並跳出迴圈
            if consultant['schedule'].get(i):
                booked = True
                break
        #若booked值依然是False就代表這段時間該顧問有空，將該顧問的【consultant】字典放進串列【available_consultants】中
        if not booked:
            available_consultants.append(consultant)

    #若【available_consultants】在上面迴圈結束後依然為空串列代表沒有consultant有空
    #沒有consultant有空的話就印出"No Service"跳回上一層的程式碼
    #return代表不需要繼續執行後面同層級的程式碼而是直接跳回上一層的程式碼
    if not available_consultants:
        print("No Service")
        return

    #若criteria的內容為"price"時
    if criteria == "price":
        #顧問由價格低到高排列
        #下方程式碼的意義為對串列【available_consultants】中的字典資料進行排列
        #排列的條件為對字典資料內的"price"項目由低到高進行排列
        #//-記住sort(key=lambda x: x[key])的用法>>建立一個函數lambda去接收x的值，接著指定x要去提取哪段資料在藉由sort去排列
        available_consultants.sort(key=lambda x: x['price'])
    elif criteria == "rate":
        #因為rate是從高排到低因此要加reverse=True
        available_consultants.sort(key=lambda x: x['rate'], reverse=True)

    # 印出串列【available_consultants】內第一個資料字典裡面key="name"的value值
    #//-提取串列內的特定字典資料的value方法
    print(available_consultants[0]['name'])
    
    # 將所選的顧問的字典資料放入selected_consultant中
    selected_consultant = available_consultants[0]
    #將所選的顧問的諮詢時間放入字典資料的schedule:{}中標記為已預約"True"
    for i in range(hour, hour + duration):
        selected_consultant['schedule'][i] = True

# 顧問資料輸入
consultants = [
    {"name": "John", "rate": 4.5, "price": 1000},
    {"name": "Bob", "rate": 3, "price": 1200},
    {"name": "Jenny", "rate": 3.8, "price": 800}
]
 #先在串列【consultants】內的字典資料【consultant】中添加"schedule":{}的資料
 #//!這段程式碼好像放到def book()內會影響結果 為什麼?
for consultant in consultants:
    consultant["schedule"] = {}
    
#測試範例
book(consultants, 15, 1, "price")  # Jenny
book(consultants, 11, 2, "price")  # Jenny
book(consultants, 10, 2, "price")  # John
book(consultants, 20, 2, "rate")   # John
book(consultants, 11, 1, "rate")   # Bob
book(consultants, 11, 2, "rate")   # No Service
book(consultants, 14, 3, "price")  # John

#task3
print("task3 result")
def func(*data):
    #建立三個list分別為名字list、中間名list、中間名數量list
    name_list=list(data)
    middle_name_list=[]
    middle_name_num=[]
    for name in data:
        #名字小於3的曲第二個字當中間名並放入列表【middle_name_list】中
        if len(name)<=3:
            temp=name[1]
            middle_name_list.append(temp)
        #名字大於3的曲第三個字當中間名並放入列表【middle_name_list】中
        else:
            temp=name[2]
            middle_name_list.append(temp)
    #計算列表【middle_name_list】的每個中間名資料出現次數並放入列表【middle_name_num】中
    for index,name in enumerate(middle_name_list):
        middle_name_num.append(middle_name_list.count(middle_name_list[index]))
    #若列表【middle_name_num】中含有數字1代表有獨特的中間名
    if 1 in middle_name_num:
        #若有多個獨特的中間名就印出"有多人有獨特的中間名"
        if middle_name_num.count(1)>1:
            print("有多人有獨特的中間名")
        #反之就印出唯一的獨特中間名對應到的名字
        else:
            print(name_list[middle_name_num.index(1)])
    #若列表【middle_name_num】中沒有數字1代表沒有獨特中間名印出"沒有"
    #//?若有多個獨特中間名時要求把這些名字都印下來該怎麼做呢?
    else:
        print("沒有")

func("彭大牆", "陳王明雅", "吳明") # print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花") # print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花") # print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆") # print 夏曼藍波安

#task4
print("task4 result")
def get_number(index):
     print(Math_list[index])

Math_list=list()
for i in range(1000):
    if i%3==0:
        temp=(i//3)*7
        Math_list.append(temp)
    elif i%3==1:
        temp=(i//3)*7+4
        Math_list.append(temp)
    else:
        temp=(i//3)*7+8
        Math_list.append(temp)       
get_number(1) # print 4
get_number(5) # print 15
get_number(10) # print 25
get_number(30) # print 70