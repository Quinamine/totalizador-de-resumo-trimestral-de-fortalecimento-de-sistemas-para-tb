"use strict"
const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll(".ficha__seccao input");
        for (let i = 0; i < inputsCelulares.length; i++) {
            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
    },
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        const campoDeObs = document.querySelector(".obs__input");
        inputsNaoCelulares.forEach( inputTarget => {
            inputTarget.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${inputTarget.id}`, inputTarget.value));
            inputTarget.value = localStorage.getItem(`${keyPrefix}-${inputTarget.id}`);
        });
        /*campoDeObs.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-input-obs`, campoDeObs.textContent));
        campoDeObs.textContent = localStorage.getItem(`${keyPrefix}-input-obs`);*/
    }
}
const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        if(inputTarget.dataset.totaleixox) {
            let classNameDosOperandos = inputTarget.dataset.totaleixox;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoxoutput}`);
            celulaDeSaida.value = this.somar(operandos);  
        }
        if(inputTarget.dataset.totaleixoy) {
            let classNameDosOperandos = inputTarget.dataset.totaleixoy;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoyoutput}`);
            celulaDeSaida.value = this.somar(operandos);  
        }
        if(inputTarget.dataset.totalgeral) {
            let classNameDosOperandos = inputTarget.dataset.totalgeral;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalgeraloutput}`);
            celulaDeSaida.value = this.somar(operandos);  
        }
    },
    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    },
}
function escutarEventos() {
    const inputsCelulares = document.querySelectorAll("[data-totaleixox], [data-totaleixoy], [data-totalgeral]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => totalizador.filtrarEtotalizarCelulas(inputCelular));
        inputCelular.value !== "" && totalizador.filtrarEtotalizarCelulas(inputCelular);
    });
}
window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




