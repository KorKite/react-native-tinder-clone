import * as Google from "expo-google-app-auth";
import { 
    GoogleAuthProvider, 
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from "firebase/auth";
import { createContext,useEffect, useContext,useState ,useMemo} from 'react';
import { View, Text } from 'react-native'
import {auth} from "../firebase"
const AuthContext = createContext({})

const config = {
    andriodClientId:"988856041484-19sh6tfpguo5acrrttl1rpq341l03f9n.apps.googleusercontent.com",
    iosClientId: "988856041484-4p7dg4kbvij2nj2unlvql65dqtliusj2.apps.googleusercontent.com",
    
    scopes : ["profile","email"],
    permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({children}) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading ] = useState(false)

    useEffect(
        () => 
        onAuthStateChanged(auth, (user)=>{
            if (user){
                //Logged In
                setUser(user);
            } else{
                // Logged Out
                setUser(null);
            }
            setLoadingInitial(false)
        }), 
    []);

    const logout = () => {
        setLoading(true);
        signOut(auth).catch((error)=> setError(error))
        .finally(setLoading(false))
    }
    
    const signInWithGoogle = async() =>{
        await Google.logInAsync(config).then(
            async (logInResult) =>{
                if (logInResult.type =="success"){
                    const {idToken, accessToken} = logInResult;
                    const credential = GoogleAuthProvider.credential(idToken,accessToken);
                    await signInWithCredential(auth, credential);
                }
                return Promise.reject();
            })
            .catch(error => setError(error))
            .finally(()=> setLoading(false))
    };

    const memoValue = useMemo(() => ({
        user,
        loading,
        error,
        logout,
        signInWithGoogle
    }), [user, loading, error]);


    return (
        <AuthContext.Provider value={memoValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
   return useContext(AuthContext); 
}
