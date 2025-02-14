
#pip install --force-reinstall -v "aiogram==2.23.1"


from aiogram import Bot, Dispatcher, executor, types
from aiogram.types import ReplyKeyboardMarkup, ReplyKeyboardRemove, KeyboardButton
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton


from aiogram import Bot, Dispatcher, executor, types
import mysql.connector as connector
#from config import TOKEN_API

bot = Bot("7753361066:AAHcpIdZnmbexVt4pbBIArKLGHaVokqO8LU")
dp = Dispatcher(bot)

conn = connector.connect(
    database = 'institutemanagement',
    host = 'localhost',
    username = 'W3_87118_Pratik',
    password = 'manager'
)
cursor = conn.cursor()

def construct_keyboard(data: tuple, page: int) -> types.InlineKeyboardMarkup:
    length=len(data)
    kb={'inline_keyboard': []}
    buttons=[]
    if page > 1: #preventing going to -1 page
        buttons.append({'text':'<-', 'callback_data':f'page_{page-1}'})
    #adding a neat page number
    buttons.append({'text':f'{page}/{length}', 'callback_data':'none'})
    if page < length: #preventing going out of range
        buttons.append({'text':'->', 'callback_data':f'page_{page+1}'})
    kb['inline_keyboard'].append(buttons)
    return kb

@dp.message_handler(commands='start')
async def start (message: types.Message):
    cursor.execute("select * from notices;")
    objs = cursor.fetchall()
    json_data = []
    for obj in objs:
        json_data.append({
            "\noticeText" : obj[2]
            
            })
    await message.answer(json_data[0], reply_markup=construct_keyboard(objs, 1))

@dp.callback_query_handler(text_startswith='page_')
async def page(call: types.CallbackQuery):
    page=int(call.data.split('_')[1])
    cursor.execute("select * from notices;")
    objs = cursor.fetchall()
    json_data = []
    for obj in objs:
        json_data.append({
            "\noticeText" : obj[2]
            
            })
    await bot.send_message(call.message.chat.id, json_data[page - 1], reply_markup=construct_keyboard(objs, page))


if __name__ == "__main__":
    executor.start_polling(dp)


