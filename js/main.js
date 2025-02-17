function calcularPropina(porcentaje) {
    let userBill = parseFloat(document.getElementById('userBill').value);
    let total = document.getElementById('total');
    let propinaUser = document.getElementById('propina');
    let personasInput = document.getElementById('people');
    let personas = parseFloat(personasInput.value);
    let peopleLabel = document.getElementById('numberPeople');

    // Validación de personas
    if (isNaN(personas) || personas <= 0) {
        peopleLabel.style.color = 'red';
        personasInput.style.backgroundColor = '#ffcccc';
        propinaUser.textContent = '0.00';
        total.textContent = '0.00';
        return;
    } else {
        
        peopleLabel.style.color = '';
        personasInput.style.backgroundColor = '';
    }

    if (!isNaN(userBill) && userBill > 0 && !isNaN(porcentaje) && porcentaje >= 0) {
        let propina = (userBill * porcentaje) / 100;
        let propinaPorPersona = propina / personas;
        let totalProp = userBill + propina;

   
        total.textContent = totalProp.toFixed(2);
        propinaUser.textContent = propinaPorPersona.toFixed(2);
    } else {
        total.textContent = '0.00';
        propinaUser.textContent = '0.00';
    }
}

// Asignar evento a los botones iniciales
document.querySelectorAll('.porcentajes').forEach(boton => {
    boton.addEventListener('click', function () {
        let porcentaje = parseFloat(this.getAttribute('data-porcentaje'));
        calcularPropina(porcentaje);
    });
});

// Escuchar cambios en el input "Custom Tip"
document.getElementById('customTip').addEventListener('input', function () {
    let porcentaje = parseFloat(this.value);
    calcularPropina(porcentaje);
});

// Escuchar cambios en el número de personas para recalcular correctamente
document.getElementById('people').addEventListener('input', function () {
    let porcentajeSeleccionado = document.querySelector('.porcentajes.active') 
        ? parseFloat(document.querySelector('.porcentajes.active').getAttribute('data-porcentaje')) 
        : parseFloat(document.getElementById('customTip').value);

    if (!isNaN(porcentajeSeleccionado)) {
        calcularPropina(porcentajeSeleccionado);
    }
});


document.getElementById('reset').addEventListener('click', function () {
    document.getElementById('userBill').value = '';
    document.getElementById('customTip').value = '';
    document.getElementById('people').value = '';
    document.getElementById('total').textContent = '0.00';
    document.getElementById('propina').textContent = '0.00';

    // Restaurar colores normales
    let peopleLabel = document.getElementById('numberPeople');
    let peopleInput = document.getElementById('people');
    peopleLabel.style.color = '';
    peopleInput.style.backgroundColor = '';
});
