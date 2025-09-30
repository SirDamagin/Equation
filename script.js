const equationBox = document.querySelector('.equationBox');
const resultBox1 = document.querySelector('.result1');
const resultBox2 = document.querySelector('.result2');

function resolve()
{
    let result1;
    let result2;
    let signPos = [];
    let equationParts = [];
    let eqPartsDef =
        {
            afirst: 0,
            bsecond: 0,
            cthird: 0
        }

    let equation = equationBox.value;

    equation = equation.trim();
    equation = equation.replace(/\s/g, "");

    if(equation[0] !== '-' && equation[0] !== '+')
    {
        equation = ('+' + equation);
    }

    for(let i = 0;i<(equation.length);i++)
    {
        if(equation[i] === '+' || equation[i] === '-')
        {
            signPos.push(i);
        }
    }
    signPos.push(equation.length);

    for(let i = 0;i<(signPos.length-1);i++)
    {
        equationParts[i] = equation.slice(signPos[i],signPos[i+1]);
    }

    console.log(equationParts);

    for(let i = 0;i<(equationParts.length);i++)
    {
        let part = equationParts[i];

        if(part.includes('^'))
        {
            eqPartsDef.afirst = eqPartsDef.afirst + (associateNumber(part));
            delete equationParts[i];
        }
    }

    for(let i = 0;i<(equationParts.length);i++)
    {
        let part = equationParts[i];

        if(part !== undefined && part.includes('x'))
        {
            eqPartsDef.bsecond = eqPartsDef.bsecond + (associateNumber(part));
            delete equationParts[i];
        }
    }

    for(let i = 0;i<(equationParts.length);i++)
    {
        let part = equationParts[i];

        if(part !== undefined)
        {
            eqPartsDef.cthird = eqPartsDef.cthird + (associateNumber(part));
            delete equationParts[i];
        }
    }

    console.log(eqPartsDef);

    if(eqPartsDef.afirst !== 0)
    {
        result1 = ((-eqPartsDef.bsecond) - Math.sqrt(Math.pow(eqPartsDef.bsecond,2) - 4*(eqPartsDef.afirst)*(eqPartsDef.cthird)))/(2*eqPartsDef.afirst);
        result2 = ((-eqPartsDef.bsecond) + Math.sqrt(Math.pow(eqPartsDef.bsecond,2) - 4*(eqPartsDef.afirst)*(eqPartsDef.cthird)))/(2*eqPartsDef.afirst);
        if(isNaN(result1))
        {
            resultBox1.innerHTML = "";
            resultBox2.innerHTML = "";
            resultBox1.innerHTML = 'Nessuna soluzione reale';
        }
        else
        {
            resultBox1.innerHTML = "";
            resultBox2.innerHTML = "";
            resultBox1.innerHTML = 'Risultato: ' + result1;
            resultBox2.innerHTML = 'Risultato: ' + result2;
        }
    }
    else
    {
        resultBox1.innerHTML = "";
        resultBox2.innerHTML = "";
        result1 = (-eqPartsDef.cthird);
        resultBox1.innerHTML = 'Risultato: ' + result1;
    }
    
    console.log(result1);
    console.log(result2);
}

function associateNumber(part)
{
    let associated = 0;

    for(let i = 1;i<part.length;i++)
    {
        if(!isNaN(Number(part[i])))
        {
            associated = associated + part[i]; 
        }
        else
        {
            break;
        }
    }

    associated = Number(part[0] + associated);
     
    if(associated === 0)
    {
        if(part[0] === '+')
        {
            return 1;
        }
        else
        {
            return -1;
        } 
    }
    else
    {
        return associated;
    }
}