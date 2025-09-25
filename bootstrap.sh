#!/usr/bin/env bash
set -euo pipefail

# NSEO Starter Bootstrap Script
# Initialise un environnement de développement React + Vite + Tauri

# Configuration des couleurs pour les messages
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Fonction de gestion des erreurs
trap 'echo -e "${RED}❌ Erreur ligne $LINENO - Script interrompu${NC}"; exit 1' ERR

# Fonction de log
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Banner
echo -e "${BLUE}"
echo "🚀 NSEO Starter Bootstrap"
echo "========================="
echo -e "${NC}"

# 1. Vérification des prérequis
log_info "Vérification des prérequis..."

if ! command -v node >/dev/null 2>&1; then
    log_error "Node.js non trouvé. Installez Node.js >= 18"
    exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
    log_warning "pnpm non trouvé. Installation via npm..."
    npm install -g pnpm
fi

NODE_VERSION=$(node -v | cut -d'v' -f2)
PNPM_VERSION=$(pnpm -v)

log_success "Node.js v$NODE_VERSION"
log_success "pnpm v$PNPM_VERSION"

# 2. Installation des dépendances
log_info "Installation des dépendances..."
pnpm install

# 3. Vérification de l'installation
if [ ! -d "node_modules" ]; then
    log_error "Échec de l'installation des dépendances"
    exit 1
fi

log_success "Dépendances installées avec succès"

# 4. Vérification optionnelle des scripts
log_info "Scripts disponibles:"
echo "  • pnpm dev      - Lancer le serveur de développement"
echo "  • pnpm build    - Construire pour la production"
echo "  • pnpm lint     - Vérifier le code avec ESLint"
echo "  • pnpm preview  - Prévisualiser le build"

echo ""
log_success "🎉 Projet NSEO Starter prêt !"
log_info "Lancez 'pnpm dev' pour démarrer le développement"