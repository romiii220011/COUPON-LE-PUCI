document.addEventListener('DOMContentLoaded', () => {
    const useCouponButtons = document.querySelectorAll('.use-coupon');

    useCouponButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('used')) {
                button.textContent = 'già usato';
                button.classList.add('used');
                button.disabled = true;

                // Invia una richiesta al backend per notificare l'uso del coupon
                fetch('/use-coupon', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ couponId: button.closest('.coupon').querySelector('h2').textContent })
                }).then(response => {
                    if (response.ok) {
                        console.log('Notifica inviata con successo');
                    } else {
                        console.error('Errore nell\'invio della notifica');
                    }
                });
            }
        });
    });
});
