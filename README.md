# Quiz

data = [
    в output мы записываем данные которые пользователь ввёл. Заместо localstorage.
    Можно одной строчкой изменить на localStorage, но я оставил в массиве.
],


СВЯЗЬ МЕЖДУ ФУНКЦИЯМИ.

variables:
quiz, (тут понятно)
form, (форма)
passed, (этап)
fase, (посути тоже этап)
modal, (модалка)
next, (некст) 
prev (prev)


startQuiz ->  (основная логика)
0 (этап) -> renderInputs(), listenerInputs(), maskPhone()
1 (этап) -> renderSelect(), listenerDropdown(), listenerCheckbox()
2 (этап) -> renderEnd()
all -> updateBtnClassess()




lib -> (вспомогательные)
next, prev, 
addInputListener(), activeModal()




Описываю функции:
1)
renderInputs -> получаем свойства МАССИВА data с индексом этапа
отрисовываем поля, возвращаем готовый html и добавляем в форму
2)
listenerInputs -> вешаем клик на инпуты через addInputListener(), изменяем output в data
3) 
maskPhone -> отрисовываем маску для телефона, всё просто


1) 
renderSelect -> получаем свойства МАССИВА data с индексом этапа
отрисовываем поля, возвращаем готовый html и добавляем в форму
2)
listenerDropdown -> вешаем клик чтобы открывать выпадающее меню
3)
listenerCheckbox -> самостоятельно устанавливаем инпутам checked. меняем данные в data


1)
renderEnd -> получаем все данные о пользователе(кто он, что заказал, какая цена)
и выводим её в форме


1)
activeModal -> модальное окно на случай ошибки( не заполнил поля )



1)
next -> если мы на последнем шаге, то останавливаемся.
если мы на самом первом(0) шаге, то проверяем заполнил ли пользователь поля через checkFormInputs()
и изменяем шаг (currentStep), вызываем startQuiz(currentStep)

2)
prev -> если мы на последнем шаге, то останавливаемся.
если мы на первом(0) шаге, то тоже останавливаемся, если посередине то вызываем
currentStep, startQuiz(currentStep)






Что можно было бы изменить:
1) Добавить на родительский класс next и prev обработчик событий, 
тогда мы бы избавились от повторяющихся условий


Как расширить викторину: 
2) Нужно было бы провести хороший рефакторинг кода, добавить пропсы в функции, но очень хорошо что мы разделили форму на два(input и select), у них разный рендер HTML


