package br.edu.utfpr.todo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import br.edu.utfpr.todo.dto.Message;
import br.edu.utfpr.todo.dto.ReadingDTO;
import br.edu.utfpr.todo.model.Reading;
import br.edu.utfpr.todo.service.ReadingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/reading")
@CrossOrigin(origins = "*")
@Tag(name = "Reading", description = "Reading resource endpoints")
public class ReadingController {

    @Autowired
    private ReadingService readingService;

    @Operation(summary = "Register a Reading in the database", description = "Register a Reading of a scaner in the database. For registration fill all Reading object information with time of reading, value, unit and the sensorId.", tags = {
        "Reading" })
        @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = Reading.class), mediaType = "application/json") }),   
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500")
    })
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody ReadingDTO readingDTO) {
        var reading = new Reading();
        BeanUtils.copyProperties(readingDTO, reading);

        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(readingService.save(reading));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Message.b(e.getMessage()));
        }
    }

    @Operation(summary = "Retrieve all Readings in the database", description = "Get all Readings objects in the database. The response is all Readings object with time, value, unit and sensorId.", tags = {
        "Reading" })
        @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = Reading.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "401"),      
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500")
    })
    @SecurityRequirement(name = "Authorization")
    @GetMapping
    public ResponseEntity<Page<Reading>> getAll(
            @PageableDefault(page = 0, size = 10, sort = "dateTime", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok().body(readingService.findAll(pageable));
    }

    @Operation(summary = "Retrieve a Reading by Id", description = "Get a Reading object by specifying its id. The response is a Readings object with time, value, unit and sensorId.", tags = {"Reading"})
    @ApiResponses({
        @ApiResponse(responseCode = "200", content = {
                @Content(schema = @Schema(implementation = Reading.class), mediaType = "application/json") }),
        @ApiResponse(responseCode = "401"),      
        @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
        @ApiResponse(responseCode = "500")
    })
    @SecurityRequirement(name = "Authorization")
    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable UUID id) {
        Optional<Reading> reading = this.readingService.findById(id);
        return reading.isPresent() ? ResponseEntity.ok(reading.get()) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Delete a Reading by Id", description = "Delete a Reading object by specifying its id.", tags = {
        "Reading" })
    @ApiResponses({
        @ApiResponse(responseCode = "200", content = {
                @Content(schema = @Schema(implementation = Reading.class), mediaType = "application/json") }),
        @ApiResponse(responseCode = "401"),      
        @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
        @ApiResponse(responseCode = "500")
    })
    @SecurityRequirement(name = "Authorization")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable UUID id) {
        Optional<Reading> reading = readingService.findById(id);
        if (reading.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        readingService.delete(reading.get());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update a Reading by Id", description = "Update a Reading object by specifying its id. The response is Reading object with the updated id, name, email and birth.", tags = {
        "Reading" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                @Content(schema = @Schema(implementation = Reading.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "401"),      
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500")
    })
    @SecurityRequirement(name = "Authorization")
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable UUID id, @RequestBody ReadingDTO readingDTO) {
        Optional<Reading> reading = readingService.findById(id);
        if (reading.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var readingToUpdate = new Reading();
        BeanUtils.copyProperties(readingDTO, readingToUpdate);
        readingToUpdate.setId(reading.get().getId());
        return ResponseEntity.ok().body(readingService.save(readingToUpdate));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
