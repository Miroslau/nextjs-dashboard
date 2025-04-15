import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {AuthType, schemaMap, SignInFormData, SignUpFormData} from "@/app/zodSchema/authSchema";

type FormDataByType<T extends AuthType> = T extends 'sign_up' ? SignUpFormData : SignInFormData;

export function useAuthForm<T extends AuthType>(type: T) {
    const schema = schemaMap[type];

    const methods = useForm<FormDataByType<T>>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
}

export default useAuthForm;