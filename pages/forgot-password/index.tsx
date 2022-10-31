import UnprotectedPage from '@template/UnprotectedPage';
import { ReactElement } from 'react';

const ForgotPasswordPage = () => {
  return <>Forgot password</>;
};

ForgotPasswordPage.getLayout = (page: ReactElement) => <UnprotectedPage>{page}</UnprotectedPage>;

export default ForgotPasswordPage;
