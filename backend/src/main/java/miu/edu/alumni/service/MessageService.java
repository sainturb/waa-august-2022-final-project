package miu.edu.alumni.service;

public interface MessageService {
    void sendNewAd(String tag); // new advertisement added / student follow tags
    void sendApplied(); // student applied to advertisement / target is Ad owner
}
