type Options = {
  relations?: string[];
  withDeleted?: boolean;
};

type UserWithoutPassword = Omit<UserEntity, 'password'>;
