import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { AuthHoc } from '../hoc/AuthHoc';
import store from '../store';
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthHoc>
        <Component {...pageProps} />
      </AuthHoc>
    </Provider>
  )
}
