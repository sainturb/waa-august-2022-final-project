package miu.edu.alumni.aop;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.ActivityLog;
import miu.edu.alumni.repository.ActivityLogRepository;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Aspect
@Component
@RequiredArgsConstructor
public class ActivityLogger {

    private final ActivityLogRepository repository;

    @Pointcut("within(miu.edu.alumni.controller..*)")
    public void trigger() {}

    @Around("trigger()")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
        Instant startedAt = Instant.now();
        Object object = joinPoint.proceed();
        Instant endedAt = Instant.now();
        ActivityLog activityLog = new ActivityLog();
        activityLog.setClassName(joinPoint.getTarget().getClass().getSimpleName());
        activityLog.setMethodName(joinPoint.getSignature().getName());
        activityLog.setExecutedTime(endedAt.toEpochMilli() - startedAt.getEpochSecond());
        repository.save(activityLog);
        return object;
    }
}
