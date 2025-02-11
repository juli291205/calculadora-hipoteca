document.addEventListener('DOMContentLoaded', () => {
    const mortgageForm = document.getElementById('mortgageForm');
    const clearAllBtn = document.getElementById('clearAll');
    
  
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    };
  
  
    const calculateMonthlyPayment = (principal, annualRate, years, isInterestOnly) => {
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;
  
        if (isInterestOnly) {
  
            return principal * monthlyRate;
        } else {
  
            if (monthlyRate === 0) return principal / numberOfPayments;
            
            const monthlyPayment = principal * 
                (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            
            return monthlyPayment;
        }
    };
  
  
    mortgageForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
  
        const principal = parseFloat(document.getElementById('mortgageAmount').value);
        const years = parseInt(document.getElementById('mortgageTerm').value);
        const annualRate = parseFloat(document.getElementById('interestRate').value);
        const isInterestOnly = document.querySelector('input[name="mortgageType"]:checked').value === 'interestOnly';
  
    
        if (isNaN(principal) || isNaN(years) || isNaN(annualRate)) {
            alert('Por favor, complete todos los campos con valores válidos');
            return;
        }
  
    
        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years, isInterestOnly);
        
    
        const totalPayment = isInterestOnly 
            ? (monthlyPayment * years * 12) + principal
            : (monthlyPayment * years * 12);
  
    
        document.getElementById('monthlyPayment').textContent = formatCurrency(monthlyPayment);
        document.getElementById('totalPayment').textContent = formatCurrency(totalPayment);
    });
  
    
    clearAllBtn.addEventListener('click', () => {
        mortgageForm.reset();
        document.getElementById('monthlyPayment').textContent = '£0.00';
        document.getElementById('totalPayment').textContent = '£0.00';
    });
  
    
    const inputs = mortgageForm.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            const min = parseFloat(e.target.min);
            const max = parseFloat(e.target.max);
  
            if (value < min) e.target.value = min;
            if (max && value > max) e.target.value = max;
        });
    });
  });