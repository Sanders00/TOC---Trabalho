package br.edu.utfpr.todo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.edu.utfpr.todo.model.Reading;
import br.edu.utfpr.todo.repository.ReadingRepository;
import jakarta.transaction.Transactional;

@Service
public class ReadingService {

    @Autowired
    private ReadingRepository readingRepository;

    public Page<Reading> findAll(Pageable pageable) {
        return readingRepository.findAll(pageable);
    }

    @Transactional
    public Reading save(Reading reading) {
        return readingRepository.save(reading);
    }

    public Optional<Reading> findById(UUID id) {
        return readingRepository.findById(id);
    }

    public List<Reading> findBySensorId(UUID sensorId) {
        return readingRepository.findBySensorId(sensorId);
    }

    public List<Reading> findByDateTimeBetween(LocalDateTime startDate, LocalDateTime endDate) {
        return readingRepository.findByDateTimeBetween(startDate, startDate);
    }

    public List<Reading> findByValueGreaterThan(double value) {
        return readingRepository.findByValueGreaterThan(value);
    }

    public List<Reading> findByValueLessThan(double value) {
        return readingRepository.findByValueLessThan(value);
    }

    @Transactional
    public void delete(Reading reading) {
        readingRepository.delete(reading);
    }
}
