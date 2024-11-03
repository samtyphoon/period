document.getElementById('sessionForm').addEventListener('submit', function(e) {
    e.preventDefault();  
    const weight = document.getElementById('weight').value;
    const reps = document.getElementById('reps').value;
    const sets = document.getElementById('sets').value;
    const fatigue = document.getElementById('fatigue').value;

    fetch('/add_session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ weight: parseFloat(weight), reps: parseInt(reps), sets: parseInt(sets), fatigue: parseInt(fatigue) })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('feedback').innerHTML = `
            <p>Fase successiva: <strong>${data.next_phase}</strong></p>
            <p>Peso consigliato: <strong>${data.next_weight} kg</strong></p>
            <p>Serie: <strong>${data.sets}</strong>, Ripetizioni: <strong>${data.reps}</strong></p>
        `;
    })
    .catch(error => console.error('Errore:', error));
});
//questo codice è generato in parte e sto cercando di capirlo bene la prima parte pulla le info 
