![Coronasweeper!](https://i.imgur.com/HBeEzdx.gif)

# Coronasweeper!
### Navigate your way through the field without running into a Rona. How far can you get?
Coronasweeper is a different take on the most successful game ever made–Minesweeper. The same rules apply, try to uncover as many squares as you can wihtout running into a Rona. You can drop a mask or a question-mark onto a square to help you win. If you're feeling extra immune, try a higher difficulty.

[Link to game](https://audarbe.github.io/minesweeper/)

---

**Levels:**

- **Outbreak**: 10x10 grid | 10 Ronas | Uncover 90 Squares to win
- **Epidemic**: 15 x 13 grid | 40 Ronas | Uncover 155 Squares to win
- **Pandemic**: 30 x 16 grid | 99 Ronas | Uncover 381 Squares to win

<br>

**Technologies Used**
- JavaScript
- jQuery
- CSS
- HTML

<br>

**Getting Started**
| Action | Description |
| ----------- | ----------- |
| Right-Click | Place a mask on the square |
| Middle-Click | Place a question mark on the square |

<br>

**How the flood works**

![How the flood works!](https://i.imgur.com/kRKPDxb.gif)

*Red - Origin, Yellow - Proximity Check, Gray - Uncovered Square*

I'd say that the entire game is based off of how it "uncovers" the squares. The way I got it to work was to create a function where it takes the square the user clicked and assign it as an origin for a proximity check. For the quares that fall within that proximity check, if the square is not a square in proximity of a mine or does not exceed the bounds of the board area, it will create new origins. From there I recall the function which will execute the proximity check on those new origins. I'm sure it's not optimal in terms of time/space complexity, but it works.

```
function flood(origin) {
  let colId = parseInt($(origin).attr('col-id'));
  let rowId = parseInt($(origin).attr('row-id'));
  proximity.forEach(function(coord) {
    checkProx = $(`.square[col-id='${colId + coord[0]}'][row-id='${rowId + coord[1]}']`)
    if ($(checkProx).hasClass('covered')) {
      $(checkProx).addClass('uncovered').removeClass('covered').removeClass('flagged').removeClass('question-mark');
      while (
        (parseInt($(checkProx).attr("col-id")) >= 0 && parseInt($(checkProx).attr("col-id")) <= difficultyLookup[difficulty].xAxis) &&
        (parseInt($(checkProx).attr("row-id")) >= 0 && parseInt($(checkProx).attr("row-id")) <= difficultyLookup[difficulty].yAxis) &&
        !($(checkProx).hasClass('occupied')) && !($(checkProx).hasClass('proxCell'))
      ){ 
      flood(checkProx);
      };
    };
  });
};
```

<br>

**Next Steps**

- [ ] Less dependence on the DOM and use more JavaScript
- [ ] Optimize Code
- [ ] Responsiveness
- [ ] Add more interative elements (audio/animations)