"use client";

export function calculateTDS (
    gh,
    kh,
    initial_tds = 0
) {
    let tds = initial_tds + gh / 1000 * 1200 + kh / 1000 * 1680;

    return tds || 0;
}

export function calculateGH(gh, water, initial_gh = 0) {

    let ret = ((initial_gh * water) + (1001.41 * gh)) / 1000;

    return Math.floor(ret) || 0;
}

export function calculateKH(kh, water, initial_kh = 0) {

    let ret = ((initial_kh * water) + (1002.46 * kh)) / 1000;

    return Math.floor(ret) || 0;
}

