package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Override
    public void sendNewAd(String tag) {
        String message = String.format("Job Ad is added with tag of %s", tag);
        this.simpMessagingTemplate.convertAndSend("/topic/" + tag, message);
    }

    @Override
    public void sendApplied() {

    }
}
