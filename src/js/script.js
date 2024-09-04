document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const lengthInput = document.getElementById('length');
  const rangeInput = document.getElementById('inputRange');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const copyButtons = document.querySelectorAll('.copy-button, #copy');
  const generateButton = document.getElementById('generate');

  const generatePassword = () => {
    const length = parseInt(lengthInput.value, 10);
    const hasLowercase = checkboxes[0].checked;
    const hasUppercase = checkboxes[1].checked;
    const hasNumbers = checkboxes[2].checked;
    const hasSymbols = checkboxes[3].checked;

    let charset = '';
    if (hasLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (hasUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (hasNumbers) charset += '0123456789';
    if (hasSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    passwordInput.value = password;
    updateStrengthIndicator(hasLowercase, hasUppercase, hasNumbers, hasSymbols);
  };

  const updateStrengthIndicator = (hasLowercase, hasUppercase, hasNumbers, hasSymbols) => {
    const progress = document.querySelector('.progress');
    let strength = 0;

    const optionsChecked = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;

    if (hasLowercase) strength++;
    if (hasUppercase) strength++;
    if (hasNumbers) strength++;
    if (hasSymbols) strength++;

    if (strength === 4) {
      progress.style.width = '100%';
      progress.style.backgroundColor = '#00FF85';
    } else if (hasLowercase && hasUppercase && optionsChecked > 2) {
      progress.style.width = '66.66%';
      progress.style.backgroundColor = '#FAF408';
    } else if (optionsChecked >= 2) {
      progress.style.width = '33.33%';
      progress.style.backgroundColor = '#E71B32';
    }
  };

  const updateRangeProgress = () => {
    const min = parseFloat(rangeInput.min);
    const max = parseFloat(rangeInput.max);
    const value = parseFloat(rangeInput.value);
    const percent = ((value - min) / (max - min)) * 100;
    rangeInput.style.setProperty('--progress', `${percent}%`);
  };

  rangeInput.addEventListener('input', () => {
    lengthInput.value = parseInt(rangeInput.value, 10);
    updateRangeProgress();
    generatePassword();
  });

  lengthInput.addEventListener('input', () => {
    rangeInput.value = lengthInput.value;
    updateRangeProgress();
    generatePassword();
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', generatePassword);
  });

  generateButton.addEventListener('click', generatePassword);

  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(passwordInput.value).then(() => {
        alert('Senha copiada para a área de transferência!');
      }).catch(err => {
        console.error('Erro ao copiar a senha: ', err);
      });
    });
  });

  generatePassword();
});
