#Task1
print("task1 result")
def find_and_print(messages, current_station):
    green_station = ["Songshan", "Nanjing Sanmin", "Taipei Arena", "Nanjing Fuxing", "Songjiang Nanjing", "Zhongshan", "Beimen", "Ximen", "Xiaonanmen", "Chiang Kai-Shek Memorial Hall", "Guting", "Taipower Building", "Gongguan", "Wanlong", "Jingmei", "Dapinglin", "Qizhang", "Xindian City Hall", "Xindian"]
    friend_stations = {}
    for friend, message in messages.items():
        for station in green_station + ["Xiaobitan"]:
            if station in message:
                friend_stations[friend] = station
                break

    distances = {}
    for friend, station in friend_stations.items():
        if station == "Xiaobitan" and current_station=="Xiaobitan":
            distance = abs(green_station.index("Qizhang") - green_station.index("Qizhang")) 
        elif station == "Xiaobitan":
            distance = abs(green_station.index(current_station) - green_station.index("Qizhang")) +1
        elif current_station=="Xiaobitan":
            distance = abs(green_station.index("Qizhang") - green_station.index(station))
        else:
            distance = abs(green_station.index(current_station) - green_station.index(station))
        distances[friend] = distance

    if distances:
        min_distance = min(distances.values())
        closest_friends = [friend for friend, distance in distances.items() if distance == min_distance]
        if len(closest_friends) == 1:
            closest_friend = closest_friends[0]
            print(closest_friend)
        else:
            print("沒有人特別靠近你")
    else:
        print("No Messages")

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
    available_consultants = []
    for consultant in consultants:
        booked = False
        for i in range(hour, hour + duration):
            if consultant['schedule'].get(i):
                booked = True
                break
        if not booked:
            available_consultants.append(consultant)

    if not available_consultants:
        print("No Service")
        return

    if criteria == "price":
        available_consultants.sort(key=lambda x: x['price'])
    elif criteria == "rate":
        available_consultants.sort(key=lambda x: x['rate'], reverse=True)

    print(available_consultants[0]['name'])
    
    selected_consultant = available_consultants[0]
    for i in range(hour, hour + duration):
        selected_consultant['schedule'][i] = True

consultants = [
    {"name": "John", "rate": 4.5, "price": 1000},
    {"name": "Bob", "rate": 3, "price": 1200},
    {"name": "Jenny", "rate": 3.8, "price": 800}
]

for consultant in consultants:
    consultant["schedule"] = {}
    
book(consultants, 15, 1, "price")
book(consultants, 11, 2, "price")
book(consultants, 10, 2, "price")
book(consultants, 20, 2, "rate")
book(consultants, 11, 1, "rate")
book(consultants, 11, 2, "rate")
book(consultants, 14, 3, "price")

#task3
print("task3 result")
def func(*data):
    name_list=list(data)
    middle_name_list=[]
    middle_name_num=[]
    for name in data:
        if len(name)<=3:
            temp=name[1]
            middle_name_list.append(temp)
        else:
            temp=name[2]
            middle_name_list.append(temp)
    for index,name in enumerate(middle_name_list):
        middle_name_num.append(middle_name_list.count(middle_name_list[index]))
    if 1 in middle_name_num:
        if middle_name_num.count(1)>1:
            print("有多人有獨特的中間名")
        else:
            print(name_list[middle_name_num.index(1)])
    else:
        print("沒有")

func("彭大牆", "陳王明雅", "吳明")
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花")
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花")
func("郭宣雅", "夏曼藍波安", "郭宣恆")

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
get_number(1)
get_number(5)
get_number(10)
get_number(30)
