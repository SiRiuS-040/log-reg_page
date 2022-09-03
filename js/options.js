function makePasswordRegExp(patterns, min, max) {
    var min = min || ''; // Если минимальное число символов не указано, берём пустую строку
    var max = max || ''; // Если максимальное число символов не указано, берём пустую строку
    var regex_string = '';
    var rules = [];
    var range = ".{" + min + "," + max + "}"; // Разрешённый диапазон для длины строки
    for (let rule in patterns) { // Обрабатываем входящий массив из ВСЕХ правил для строки
        if (patterns.hasOwnProperty(rule)) {
            rules.push(patterns[rule]); // Запоминаем правила
            // Формируем последовательность из шаблонов `(?=.*[%s])`
            // Она проверит обязательное присутствие всех символов из входящего набора
            regex_string += "(?=.*[" + patterns[rule] + "])";
        }
    }
    // Добавляем в хвост набор из ВСЕХ разрешённых символов и разрешённую длину строки
    // regex_string += "[" + rules.join('') + "]" + range;
    regex_string += range;
    // Собираем всё в одно регулярное выражение
    // return new RegExp(regex_string, 'g');
    return new RegExp(regex_string);
};

var patterns = {
    'numeric': '0-9',

    //   'special': '!@#$%^&*',  
    'latin_lower': 'a-z',
    'latin_upper': 'A-Z',
    'special': '!@#$%^&*_.,+=',
};
var min = 8;
let passwordTest = makePasswordRegExp(patterns, min);
console.log(passwordTest);
// let passwordTest = /^(.{8,})$/;
// let passwordTest = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/;



let emailTest = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;
let nameTest = /^([А-Яа-яё -]{1,50}|[A-Za-z -]{1,50})$/;

const TIMER_DATA = 59;

export { emailTest, passwordTest, TIMER_DATA, nameTest };