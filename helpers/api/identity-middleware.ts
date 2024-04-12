import { userRepo } from '../db-repo';

async function identityMiddleware(req, identity = 'user', isJwt = false) {
  if (identity === 'user' && isJwt === false) return;
  const useId = req.headers.get('useId');
  const user = await userRepo.getOne({ _id: useId });
  req.headers.set('userRole', user.role);
  req.headers.set('userRoot', user.root);

  if (identity === 'admin' && user.role !== 'admin') {
    throw new Error('无权操作');
  }

  if (identity === 'root' && !user.root) {
    throw new Error('无权操作，仅超级管理员可操作');
  }
}

export { identityMiddleware };
