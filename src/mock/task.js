const DESCRIPTION = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTION.length - 1);

  return DESCRIPTION[randomIndex];
};

const generateTask = () => {
  return {
    description: generateDescription(),
    dueDate: null,
    repeating: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    },
    color: `black`,
    isArchive: false,
    isFavorite: false
  };
};

export {generateTask};
