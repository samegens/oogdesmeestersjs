# OogDesMeestersJS

![Start van het avontuur](https://github.com/samegens/oogdesmeestersjs/blob/master/img/par1_trap.png?raw=true)

JavaScript implementatie van het voorbeeldavontuur van [Het Boek van Avontuur](https://hetoogdesmeesters.files.wordpress.com/2017/11/odm10-boekvanavontuur_odm.pdf) van rollenspel [Het Oog Des Meesters](https://nl.wikipedia.org/wiki/Het_Oog_des_Meesters). 
Bevat een framework om zelf soortgelijke avonturen mee te bouwen.

## Spelen

Helaas werkt het niet goed als je simpelweg `index.html` opent in een browser. Je hebt echt een webserver(tje) nodig. 
Ik heb daar zelf [TinyWeb](https://www.ritlabs.com/en/products/tinyweb/) voor gebruikt. 

Er draait een versie van dit avontuur op [Azure](https://azure.microsoft.com/), zie [http://oogdesmeesters.azurewebsites.net](http://oogdesmeesters.azurewebsites.net/), deze versie is niet altijd de laatste.

## Zelf avonturen maken

Zie voor voorbeelden [`example.html`](https://github.com/samegens/oogdesmeestersjs/blob/master/example.html) ([live versie](http://oogdesmeesters.azurewebsites.net/example.html)) en [`pak_mes_dood_monster.html`](https://github.com/samegens/oogdesmeestersjs/blob/master/pak_mes_dood_monster.html) ([live versie](http://oogdesmeesters.azurewebsites.net/pak_mes_dood_monster.html)).

## Bugs

- De demoon heeft niet hetzelfde wapen als jij als je een ander wapen hebt dan de standaard knuppel.
- Laden gaat traag (4 seconden op Azure).
- Er is een link die niet werkt, moet nog proberen te reproduceren.
