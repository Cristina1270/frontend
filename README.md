# Frontend - Gestión de Productos

Aplicación web para gestionar productos desarrollada con React + Vite, desplegada en AWS EC2 mediante Docker y GitHub Actions.

## Tecnologías
- React 18 + Vite
- Nginx (servidor web)
- Docker (multi-stage build)
- AWS EC2 + ECR
- GitHub Actions (CI/CD)

## Arquitectura
Internet
↓
EC2-Frontend (Pública) → IP: 3.213.247.145
└── Docker: nginx + React
└── Proxy /api/ → EC2-Backend (Privada)
└── Docker: Node.js + MySQL

## Estructura del proyecto
frontend/
├── src/              → Código fuente React
├── public/           → Archivos estáticos
├── Dockerfile        → Multi-stage build (Node + Nginx)
├── nginx.conf        → Configuración nginx con proxy al backend
├── docker-compose.yml→ Para levantar localmente
├── .dockerignore     → Archivos ignorados por Docker
└── .github/
└── workflows/
└── cicd-frontend.yml → Pipeline CI/CD

## Variables de entorno
No requiere variables de entorno. La URL del backend se configura en `nginx.conf`.

## Ejecutar localmente
```bash
docker-compose up -d
```
Acceder en: http://localhost

## Pipeline CI/CD
El pipeline se activa con push en la rama `deploy` y ejecuta:
1. **Build** → construye la imagen Docker
2. **Push** → publica en Amazon ECR con tag versionado
3. **Deploy** → se conecta por SSH a EC2 y actualiza el contenedor

## Secrets requeridos
| Secret | Descripción |
|--------|-------------|
| AWS_ACCESS_KEY_ID | Clave de acceso AWS |
| AWS_SECRET_ACCESS_KEY | Clave secreta AWS |
| AWS_SESSION_TOKEN | Token de sesión AWS |
| AWS_REGION | Región AWS (us-east-1) |
| AWS_ACCOUNT_ID | ID de cuenta AWS |
| EC2_HOST | IP pública de la EC2 |
| EC2_USER | Usuario EC2 (ec2-user) |
| EC2_SSH_KEY | Clave privada SSH (.pem) |

## Capturas de evidencia
- Pipeline exitoso en GitHub Actions
- Imagen publicada en Amazon ECR
- Frontend funcionando en EC2