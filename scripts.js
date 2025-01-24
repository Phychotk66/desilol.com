class DesilolApp {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        this.initializeEventListeners();
        this.initializeClipboard();
        this.initializeToast();
    }

    initializeEventListeners() {
        // Extraction button
        document.getElementById('extractBtn').addEventListener('click', () => this.handleExtraction());
        
        // Input field enter key
        document.getElementById('profileInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleExtraction();
        });
    }

    initializeClipboard() {
        // Wallet copy button
        document.getElementById('copyButton').addEventListener('click', () => {
            const address = document.getElementById('walletAddress').value;
            this.copyToClipboard(address);
        });
    }

    initializeToast() {
        this.toastElement = new bootstrap.Toast(document.getElementById('statusToast'));
    }

    async handleExtraction() {
        const urlInput = document.getElementById('profileInput');
        const url = urlInput.value.trim();

        if (!this.validateUrl(url)) {
            this.showToast('❌ Invalid OnlyFans URL format', 'error');
            urlInput.focus();
            return;
        }

        try {
            this.toggleLoadingState(true);
            const result = await this.simulateExtraction(url);
            this.showToast(`✅ Successfully processed ${result.count} media items`, 'success');
        } catch (error) {
            this.showToast(`⚠️ Error: ${error.message}`, 'error');
        } finally {
            this.toggleLoadingState(false);
        }
    }

    validateUrl(url) {
        const pattern = /^(https?:\/\/)?(www\.)?onlyfans\.com\/[a-zA-Z0-9_-]+\/media\/?$/;
        return pattern.test(url);
    }

    async simulateExtraction(url) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    count: Math.floor(Math.random() * 50) + 20
                });
            }, 1500);
        });
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('✅ BTC address copied to clipboard', 'success');
        } catch (err) {
            this.showToast('❌ Failed to copy address', 'error');
            console.error('Copy error:', err);
        }
    }

    toggleLoadingState(loading) {
        const btn = document.getElementById('extractBtn');
        btn.disabled = loading;
        btn.innerHTML = loading 
            ? `<span class="spinner-border spinner-border-sm"></span> Processing...`
            : 'Initialize Extraction Protocol';
    }

    showToast(message, type = 'info') {
        const toastBody = document.getElementById('toastBody');
        toastBody.textContent = message;
        
        // Remove previous styling
        toastBody.className = 'toast-body';
        
        // Add type-specific styling
        switch(type) {
            case 'success':
                toastBody.style.backgroundColor = 'rgba(40, 167, 69, 0.95)';
                break;
            case 'error':
                toastBody.style.backgroundColor = 'rgba(220, 53, 69, 0.95)';
                break;
            default:
                toastBody.style.backgroundColor = 'rgba(114, 47, 55, 0.95)';
        }
        
        this.toastElement.show();
    }
}

// Disable right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    this.showToast('Right-click disabled', 'error');
});

// Disable text selection
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
});

// Disable keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Disable Ctrl+U and Ctrl+S
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 's')) {
        e.preventDefault();
        this.showToast('This action is disabled', 'error');
    }
});


// Initialize application when DOM loads
window.addEventListener('DOMContentLoaded', () => {
    new DesilolApp();
});