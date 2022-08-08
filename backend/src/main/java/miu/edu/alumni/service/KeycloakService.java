package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.dto.UserRequest;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeycloakService {

    private final Keycloak keycloak;

    public RoleRepresentation findRoleByName(String name) {
        return keycloak
                .realm("alumni")
                .roles()
                .get(name)
                .toRepresentation();
    }


    public List<UserRepresentation> findAll() {
        return keycloak
                .realm("alumni")
                .users()
                .list();
    }

    public List<UserRepresentation> findByUsername(String username) {
        return keycloak
                .realm("alumni")
                .users()
                .search(username);
    }

    public UserRepresentation findById(String id) {
        return keycloak
                .realm("alumni")
                .users()
                .get(id)
                .toRepresentation();
    }

    public void assignToGroup(String userId, String groupId) {
        keycloak
                .realm("alumni")
                .users()
                .get(userId)
                .joinGroup(groupId);
    }

    public void assignRole(String userId, RoleRepresentation roleRepresentation) {
        keycloak
                .realm("alumni")
                .users()
                .get(userId)
                .roles()
                .realmLevel()
                .add(List.of(roleRepresentation));
    }

    public void create(UserRequest request) {
        CredentialRepresentation password = preparePasswordRepresentation(request.getPassword());
        UserRepresentation user = prepareUserRepresentation(request, password);
        keycloak
                .realm("alumni")
                .users()
                .create(user);
    }

    public void setRequiredAction(String userId, String action) {
        UserResource user =  keycloak
                .realm("alumni")
                .users()
                .get(userId);
        UserRepresentation userRep = user.toRepresentation();
        userRep.setRequiredActions(List.of(action));
        user.update(userRep);
    }

    private CredentialRepresentation preparePasswordRepresentation(String password) {
        CredentialRepresentation cR = new CredentialRepresentation();
        cR.setTemporary(true);
        cR.setType(CredentialRepresentation.PASSWORD);
        cR.setValue(password);
        return cR;
    }

    private UserRepresentation prepareUserRepresentation(
            UserRequest request,
            CredentialRepresentation credential
    ) {
        UserRepresentation newUser = new UserRepresentation();
        newUser.setUsername(request.getUsername());
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmail(request.getEmail());
        newUser.setCredentials(List.of(credential));
        newUser.setEnabled(true);
        newUser.setEmailVerified(true);
        newUser.setRequiredActions(List.of("TERMS_AND_CONDITIONS"));
        return newUser;
    }

}
