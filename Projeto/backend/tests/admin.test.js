const adminService = require('../src/services/admin.service');
jest.mock('../src/repositories/admin.repository');

const mockAdmin = {
  user: 'admin1',
  password: 'senhaSegura123',
  nome_admin: 'Coordenador ELLP',
};

describe('Admin Service', () => {
  it('deve criar um novo administrador', async () => {
    const result = await adminService.createAdmin(mockAdmin);
    expect(result.nome_admin).toBe('Coordenador ELLP');
  });

  it('deve autenticar admin com credenciais válidas', async () => {
    const result = await adminService.login('admin1', 'senhaSegura123');
    expect(result).toHaveProperty('token');
  });
});
