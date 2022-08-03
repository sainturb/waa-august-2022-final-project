import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../App";

const client = 'alumni';
const secret = 'g6saFtjcfpIA1wfG7AEvQpABsJf2y19e';
const url = `http://localhost:8081/auth/realms/${client}/protocol/openid-connect/auth?response_type=token&client_id=${client}&redirect_uri=http://localhost:3000/callback`

function RequireAuth({ children, ...rest }) {
    let auth = useAuth();
    let location = useLocation();
    if (!auth.token) {
        // return <Navigate to={url} state={{ from: location }} />;
        window.location.href = url;
        return null;
    }
    http://localhost:3000/callback#session_state=4b74c672-1ee8-47f3-b82d-60bb515496c7&access_token=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2blVUdWxLOWQta1V5ODlCV05VVkVReWprYVZsZGVPUm1kRjJPNGpPQzY4In0.eyJleHAiOjE2NTk0ODA0MTgsImlhdCI6MTY1OTQ3OTUxOCwiYXV0aF90aW1lIjoxNjU5NDc5NTE4LCJqdGkiOiI2MjVjNzQzMi00Y2MwLTQxNWQtOWRiNi00MzQwOWM4ZDc5YTAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODEvYXV0aC9yZWFsbXMvYWx1bW5pIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImExOWE3MTcyLTJlNWItNDUyMi1hNTc1LWRjZDBjNjMyZDVjZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFsdW1uaSIsInNlc3Npb25fc3RhdGUiOiI0Yjc0YzY3Mi0xZWU4LTQ3ZjMtYjgyZC02MGJiNTE1NDk2YzciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1hbHVtbmkiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNGI3NGM2NzItMWVlOC00N2YzLWI4MmQtNjBiYjUxNTQ5NmM3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoic2FpbnR1ciBiYXRraHV1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZXNhaW50b3IiLCJnaXZlbl9uYW1lIjoic2FpbnR1ciIsImZhbWlseV9uYW1lIjoiYmF0a2h1dSIsImVtYWlsIjoic2FpbnR1ci5iYXRraHV1QG1pdS5lZHUifQ.f4HhVtJSpQtC0l6byMWKdXiH9waDvKAFjXBurqEonB9qn5pb3wMLoBVnENe_XYn5ML3A8scb7T5WOcCc9OCrdE12YZrO-tmlT6pI8WVnI4SUNqGfIt5rdg__TpsVeFkNT-S2YI4x8IyP3U88oeHPjpD6Lg-2rVHKOxBI7aAvaCyR7eW80Zpkg4nmFQZrtEWiWBQjbtasFHufcUo9fyAdoynA6jpllRmsFCqjhuDLVEDE3WvOWawHtY1MVVx_1Sp-ttTB1fOldvVylBmCWZI8Z9ZY40VCXH_FdiX1yM_UbOpz1yQsZ-2qE38vHZMkUjPGQeOv9Ni8sLn1uTHnaez2Kg&token_type=Bearer&expires_in=900
    return children;
}

export default RequireAuth;