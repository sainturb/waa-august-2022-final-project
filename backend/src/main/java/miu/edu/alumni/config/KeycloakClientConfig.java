package miu.edu.alumni.config;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class KeycloakClientConfig {
    @Value("${keycloak.auth-server-url}")
    private String authUrl;
    @Bean
    public Keycloak keycloak()  {
        return KeycloakBuilder
                .builder()
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId("internal")
                .clientSecret("gzSAlwWdnRXed60Ut7E8hZlHrLt8PwLx")
                .serverUrl(authUrl)
                .realm("alumni")
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
    }
}