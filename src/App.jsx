import { Provider } from 'react-redux'
import { store } from './components/store'
import AppRouter from './routers/AppRouter'
import AppTheme from './theme/AppTheme'

const App = () => {
    return (
        <Provider store={store} >
            <AppTheme>
                <AppRouter />
            </AppTheme>
        </Provider>
    )
}

export default App