## [Игра «Жизнь»](https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB) (Conway's Game of Life)

Клеточный автомат, придуманный английским математиком [Джоном Конвеем](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D0%B2%D0%B5%D0%B9,_%D0%94%D0%B6%D0%BE%D0%BD_%D0%A5%D0%BE%D1%80%D1%82%D0%BE%D0%BD) в 1970 году.

### Правила
* Каждая клетка на этой поверхности может находиться в двух состояниях: быть «живой» (заполненной) или быть «мёртвой» (пустой). Клетка имеет восемь соседей, окружающих её.
* Распределение живых клеток в начале игры называется первым поколением.
* Каждое следующее поколение рассчитывается на основе предыдущего по правилам:

  * в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
  * если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»)

* Игра прекращается, если
  
  * на поле не останется ни одной «живой» клетки
  * конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
  * при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная конфигурация; предыдущее правило, вырожденное до одного шага назад)

### Что сделано
- [x] в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
- [x] если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить;
- [x] если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»);
- [x] на поле не останется ни одной «живой» клетки
- [ ] конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
- [x] при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная конфигурация; предыдущее правило, вырожденное до одного шага назад)

### Как играть
Первое поколение задается с помощью мыши. После этого необходимо нажать на кнопку старт.
