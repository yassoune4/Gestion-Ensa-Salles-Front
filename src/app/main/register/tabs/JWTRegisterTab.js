import React, {useEffect, useRef, useState} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {Button, InputAdornment, Icon} from '@material-ui/core';
import * as authActions from 'app/auth/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import SelectInput from "@material-ui/core/Select/SelectInput";
import Select from "@material-ui/core/Select";
import SelectFormsy from "../../../../@fuse/components/formsy/SelectFormsy";
import MenuItem from "@material-ui/core/MenuItem";



function JWTRegisterTab(props)
{
    const dispatch = useDispatch();
    const register = useSelector(({auth}) => auth.register);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if ( register.error && (register.error.username || register.error.password || register.error.email || register.error.role) )
        {
            formRef.current.updateInputsWithError({
                ...register.error
            });
            disableButton();
        }
    }, [register.error]);

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        dispatch(authActions.submitRegister(model));
        console.log(model);
    }

    return (
        <div className="w-full">
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="username"
                    label="Display name"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Email"
                    validations="isEmail"
                    validationErrors={{
                        isEmail: 'Please enter a valid email'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    validations="equalsField:password-confirm"
                    validationErrors={{
                        equalsField: 'Passwords do not match'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password-confirm"
                    label="Confirm Password"
                    validations="equalsField:password"
                    validationErrors={{
                        equalsField: 'Passwords do not match'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />
                <SelectFormsy
                    className="my-16"
                    name="role"
                    label="Role"
                    value="none"
                    required
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="ETUDIANT">Etudiant</MenuItem>
                    <MenuItem value="PROFESSEUR">Professeur</MenuItem>
                    <MenuItem value="SCOLARITE">Scolarite</MenuItem>
                </SelectFormsy>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="REGISTER"
                    disabled={!isFormValid}
                    value="legacy"
                >
                    Register
                </Button>

            </Formsy>

        </div>
    );
}

export default JWTRegisterTab;
