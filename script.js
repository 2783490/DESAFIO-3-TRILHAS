document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const saveButton = document.getElementById('save-button');

    // Função para validar e-mail
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para validar CPF simples (11 dígitos numéricos)
    function isValidCPF(cpf) {
        return /^\d{11}$/.test(cpf);
    }

    // Função para validar se uma trilha foi escolhida
    function isTrilhaSelecionada() {
        const trilhas = document.getElementsByName('trilha');
        return Array.from(trilhas).some(t => t.checked);
    }

    // Função para mostrar mensagem de erro
    function showError(inputId, message) {
        const errorSpan = document.getElementById(`error-${inputId}`);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    // Função para limpar mensagens de erro
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(e => e.textContent = '');
    }

    // Função de validação
    function validateForm() {
        clearErrors();
        let isValid = true;

        const fields = [
            { id: 'full-name', name: 'Nome Completo' },
            { id: 'birth-date', name: 'Data de Nascimento' },
            { id: 'cpf', name: 'CPF' },
            { id: 'gender', name: 'Sexo' },
            { id: 'email', name: 'E-mail' },
            { id: 'phone', name: 'Telefone' },
            { id: 'cep', name: 'CEP' },
            { id: 'address', name: 'Endereço' },
            { id: 'user-id', name: 'ID do Usuário' },
            { id: 'password', name: 'Senha' }
        ];

        for (const field of fields) {
            const input = document.getElementById(field.id);
            if (!input.value.trim()) {
                showError(field.id, `O campo ${field.name} é obrigatório.`);
                isValid = false;
            }
        }

        const email = document.getElementById('email').value.trim();
        if (email && !isValidEmail(email)) {
            showError('email', 'Digite um e-mail válido.');
            isValid = false;
        }

        const cpf = document.getElementById('cpf').value.trim();
        if (cpf && !isValidCPF(cpf)) {
            showError('cpf', 'O CPF deve conter exatamente 11 dígitos numéricos.');
            isValid = false;
        }

        const trilhaSelecionada = isTrilhaSelecionada();
        if (!trilhaSelecionada) {
            showError('trilha', 'Selecione uma trilha de aprendizagem.');
            isValid = false;
        }

        const terms = document.getElementById('terms');
        if (!terms.checked) {
            showError('terms', 'Você deve aceitar os Termos e Condições.');
            isValid = false;
        }

        return isValid;
    }

    // Função para salvar dados no localStorage
    function salvarTemporariamente() {
        const dados = {
            fullName: document.getElementById('full-name').value,
            birthDate: document.getElementById('birth-date').value,
            cpf: document.getElementById('cpf').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            cep: document.getElementById('cep').value,
            address: document.getElementById('address').value,
            userId: document.getElementById('user-id').value,
            password: document.getElementById('password').value,
            trilha: document.querySelector('input[name="trilha"]:checked')?.value || ''
        };

        localStorage.setItem('formularioInscricao', JSON.stringify(dados));
        alert('Informações salvas temporariamente!');
    }

    // Evento para salvar dados
    saveButton.addEventListener('click', salvarTemporariamente);

    // Evento de envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Inscrição realizada com sucesso!');
            localStorage.removeItem('formularioInscricao');
            form.reset();
        }
    });

    // Carrega dados do localStorage se existirem
    function carregarDadosSalvos() {
        const dadosSalvos = localStorage.getItem('formularioInscricao');
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            document.getElementById('full-name').value = dados.fullName || '';
            document.getElementById('birth-date').value = dados.birthDate || '';
            document.getElementById('cpf').value = dados.cpf || '';
            document.getElementById('gender').value = dados.gender || '';
            document.getElementById('email').value = dados.email || '';
            document.getElementById('phone').value = dados.phone || '';
            document.getElementById('cep').value = dados.cep || '';
            document.getElementById('address').value = dados.address || '';
            document.getElementById('user-id').value = dados.userId || '';
            document.getElementById('password').value = dados.password || '';
            if (dados.trilha) {
                const trilhaInput = document.querySelector(`input[name="trilha"][value="${dados.trilha}"]`);
                if (trilhaInput) trilhaInput.checked = true;
            }
        }
    }

    carregarDadosSalvos();
});
