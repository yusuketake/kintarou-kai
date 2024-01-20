package com.benkyo.restcontroller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.benkyo.dao.AttendanceDao;
import com.benkyo.entity.UserDetailsImpl;
import com.benkyo.entity.gen.Attendances;
import com.benkyo.model.dto.DeleteAttendance;
import com.benkyo.model.dto.GetAttendance;
import com.benkyo.model.dto.GetAttendanceList;
import com.benkyo.model.dto.UpsertAttendance;
import com.benkyo.model.dto.User;
import com.benkyo.service.AttendancesService;
import lombok.extern.slf4j.Slf4j;


// TODO Javaのformatter、余分なimport文消してくれないから変える必要あり。


@RequestMapping("/api/attendances")
@RestController
@Slf4j
public class AttendancesController {
    private AttendancesService attendancesService;
    private Attendances attendances;

    // attendancesDaoやattendancesはコンストラクタで初期化しなくて大丈夫だよね？
    public AttendancesController(AttendancesService attendancesService, Attendances attendances) {
        this.attendancesService = attendancesService;

        // 各メソッドでnewするとメモリ効率悪い、インスタンスの初期化メソッドごとに書く必要あって冗長になる。コンストラクタで初期化する。全メソッドで使うクラスについては特に。Beanには指定しなくてok、クラスを跨いで必要なもの（例えばDtoとか）ではないため。
        this.attendances = attendances;
    }

    @GetMapping("get")
    public ResponseEntity<Attendances> getAttendance(
            @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @RequestBody GetAttendance attendance) {

        // userIdはsessionから取得
        attendances.setUserId(userDetailsImpl.getId());
        attendances.setYear(attendance.getYear());
        attendances.setMonth(attendance.getMonth());
        attendances.setDay(attendance.getDay());

        try {
            return ResponseEntity.ok().body(attendancesService.getAttendance(attendances));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("getAttendanceListByYearAndMonth")
    public ResponseEntity<List<Attendances>> getAttendanceListByYearAndMonth(
            @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @RequestBody GetAttendanceList attendance) {
        attendances.setUserId(userDetailsImpl.getId());
        attendances.setYear(attendance.getYear());
        attendances.setMonth(attendance.getMonth());

        try {
            return ResponseEntity.ok()
                    .body(attendancesService.getAttendanceListByYearAndMonth(attendances));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("insert")
    public ResponseEntity<Integer> insertAttendance(
            @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @RequestBody UpsertAttendance attendance) {
        attendances.setUserId(userDetailsImpl.getId());
        attendances.setYear(attendance.getYear());
        attendances.setMonth(attendance.getMonth());
        attendances.setDay(attendance.getDay());
        attendances.setStartTime(attendance.getStartTime());
        attendances.setEndTime(attendance.getEndTime());

        try {
            int isPosted = attendancesService.insertAttendance(attendances);

            if (isPosted == 0) {
                System.err.println("attendanceは存在してませんでしたが、insertできませんでした");
            }
            return ResponseEntity.ok().body(isPosted);
        } catch (Exception e) {
            log.error("###### sql失敗.エラー: " + e.getMessage());
            return ResponseEntity.badRequest().body(0);
        }
    }

    // TODO updateも削除対象のattendanceがあるかチェックして、あった場合はerror投げるようにしたけどいらない？
    @PutMapping("update")
    public ResponseEntity<Integer> updateAttendance(
            @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @RequestBody UpsertAttendance attendance) {
        attendances.setUserId(userDetailsImpl.getId());
        attendances.setYear(attendance.getYear());
        attendances.setMonth(attendance.getMonth());
        attendances.setDay(attendance.getDay());
        attendances.setStartTime(attendance.getStartTime());
        attendances.setEndTime(attendance.getEndTime());

        try {
            int isUpdated = attendancesService.updateAttendance(attendances);

            if (isUpdated == 0) {
                System.err.println("attendanceは存在してませんでしたが、insertできませんでした");
            }
            return ResponseEntity.ok().body(isUpdated);
        } catch (Exception e) {
            log.error("###### sql失敗.エラー: " + e.getMessage());
            return ResponseEntity.badRequest().body(0);
        }
    }

    // TODO deleteも削除対象のattendanceがあるかチェックして、あった場合はerror投げるようにしたけどいらない？
    @DeleteMapping("delete")
    public ResponseEntity<Integer> deleteAttendance(
            @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @RequestBody DeleteAttendance attendance) {
        attendances.setUserId(userDetailsImpl.getId());
        attendances.setYear(attendance.getYear());
        attendances.setMonth(attendance.getMonth());
        attendances.setDay(attendance.getDay());

        try {
            int isDeleted = attendancesService.deleteAttendance(attendances);

            if (isDeleted == 0) {
                System.err.println("attendanceは存在していましたが、deleteできませんでした");
            }
            return ResponseEntity.ok().body(isDeleted);
        } catch (Exception e) {
            log.error("###### sql失敗.エラー: " + e.getMessage());
            return ResponseEntity.badRequest().body(0);
        }
    }
}
