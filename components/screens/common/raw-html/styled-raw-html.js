import styled from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";
import copyIcon from "@public/images/icons/copy.svg";

const StyledRawHtml = styled.div`
  .raw-html-embed {
    z-index: 1;
    position: relative;
    font-size: 14px;
    line-height: 21px;
    word-break: break-word;

    div[id] {
      scroll-margin-top: 24px;
    }

    p {
      margin: 8px 0;
      padding: 0;

      &.last_update {
        text-align: end;
      }
    }

    b {
      word-break: break-word;
    }

    /* tables */
    table {
      border-spacing: 0;
      margin: 10px 0 20px;
      text-align: center;
      width: 100%;

      &.table_portslist {
        text-align: left;

        td img {
          margin: 0;
        }

        &.common_ports {
          th.table_port, td.table_port {
            text-align: right;
          }
        }
      }

      &.keyboard_shortcuts_table {
        text-align: left;

        td {
          width: unset;
        }
      }

      &.table_parameters {
        text-align: left;

        td {
          width: 40%;
        }
      }
  
      &.sticky_table {
        th {
          position: -webkit-sticky;
          position: sticky;
          top: 73px;
          border-bottom: 1px solid #d7d8dc;
          background: white;
          z-index: 100;          
        }

        td {            
          color: ${globalColors.gray};
          font-size: 16px;
          font-weight: 600;
          padding: 8px;
          vertical-align: middle;
        }

        span {
          font-size: 16px;
          font-weight: 600;
        }
      }
  
      &.talk_pages {
        td {
          width: auto;
        }
      }
  
      &.talk_pages {
        &.languages_list_table {
          width: 100%;

          &.translators_list_table {
            width: auto;
            min-width: 55%;

            th, td {
              text-align: left;
              width: auto;
              padding-right: 40px;
              padding-left: 20px;
              white-space: pre-line;

              .locale_lng {
                display: block;
                margin-top: 5px;

                &:first-child {
                  margin-top: 0;
                }
              }

              &:first-child {
                width: auto;
                vertical-align: top;
              }

              &:nth-child(2) {
                width: auto;
              }
            }
          }

          &.newstr_list_table {
            width: auto;
            min-width: 55%;

            th, td {
              text-align: left;
              width: auto;
              padding-right: 40px;
              padding-left: 20px;

              &:first-child {
                width: auto;
              }

              &:nth-child(2), &:nth-child(3) {
                width: auto;
              }
            }

            td {
              white-space: pre-line;
            }
          }

          th {
            vertical-align: bottom;

            &.header {
              cursor: pointer;
            }

            span {
              position: relative;
            }

            &.header span:after {
              content: "";
              position: absolute;
              right: -17px;
              top: 13px;
              display: block;
              height: 0;
              width: 0;
              border-style: solid;
              border-width: 4px 4px 0 4px;
              border-color: ${globalColors.grayTextInput} transparent transparent transparent;
            }

            &.header span:before {
              content: "";
              position: absolute;
              right: -17px;
              top: 7px;
              display: block;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 4px 4px 4px;
              border-color: transparent transparent ${globalColors.grayTextInput} transparent;
            }

            &.header.headerSortDown span:before {
              display: none;
            }

            &.header.headerSortDown span:after {
              top: 11px;
            }

            &.header.headerSortUp span:before {
              top: 10px;
            }

            &.header.headerSortUp span:after {
              display: none;
            }
          }

          td:first-child, th:first-child {
            text-align: left;
          }

          td:first-child {
            width: 40%;
          }

          td:nth-child(2), td:nth-child(3), td:nth-child(4), td:nth-child(5), td:nth-child(6) {
            width: 13%;
          }

          tr {
            &:nth-child(even) {
              background-color: ${globalColors.bgGray};
            }

            &:nth-child(odd) {
              background-color: ${globalColors.white};
            }
          }
        }
      }
  
      td {
        border-bottom: 1px solid #d7d8dc;
        font-weight: 400;
        padding: 8px;
        vertical-align: middle;
        width: 12%;

        img {
          vertical-align: middle;
          margin: 0 10px 0 0;
        }
      }
  
      th {
        border-bottom: 1px solid #d7d8dc;
        color: ${globalColors.gray};
        font-size: 16px;
        font-weight: 600;
        padding: 8px;
        vertical-align: middle;
        word-break: keep-all;
        white-space: normal;
      }
  
      th.table_empty_cell {
        border-bottom: 0 none;
      }

      img {
        @media ${device.mobile} {
          width: auto;
        }
      }

      @media ${device.mobile} {
        display: block;
        overflow-x: scroll;
      }
    }

    /* lists */
    ul,
    li,
    ol {
      padding: 0;
      margin: 0;
    }

    ul, 
    ol {
      margin: 8px 0;
    }

    ol {
      padding: 0;

      > li {
        margin: 0px 0 0px 16px;

        &:not(:last-child) {
          margin: 0 0 8px 16px;
        }
      }

      li::marker {
        font-weight: bold;
      }

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }

    ul {
      list-style-type: disc;

      li {
        margin: 0 0 0 22px;

        &:not(:last-child) {
          margin: 0 0 8px 22px;
        }
      }
            
      &.ul-category {
        list-style-type: none;

        > li {
          list-style-type: none;
          margin: 0;
        }
      }

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }

    hr {
      margin: 32px 0;
    }

    /* divs */
    .border-content {
      margin-bottom: 24px;
      padding-bottom: 23px;
      border-bottom: 1px solid ${globalColors.grayLight};
    }

    .gs_content {
      margin-top: 24px;
      scroll-margin-top: 24px;
      
      h4 {
        margin-top: 64px;

        @media ${device.laptop} {
          margin-top: 56px;
        }

        @media ${device.mobile} {
          margin-top: 48px;
        }
      }

      &:first-child {
        h4 {
          margin-top: 0;
        }
      }

      &:last-child {
        border-bottom: 0px;
      }

      @media ${device.mobile} {
        margin-top: 16px;
        scroll-margin-top: 16px;
      }
    }

    .gs_submenu {
      border-bottom: 0px;
    }

    .PortalHelp {
      padding: 0;
    }

    .notehelp, .note {
      border-left: 5px solid #808080;
      color: ${globalColors.grayTextInput};
      display: flow-root;
      position: relative;
      border-radius: 3px;
      margin: 48px 0px 48px 22px;
      padding: 16px;
      font-size: 14px;
      line-height: 22px;
      background-color: ${globalColors.bgGray};

      &.nh_important {
        border-color: ${globalColors.bgGray};
        border-left: 5px solid ${globalColors.orangeLetters};
      }

      > .important_notice_label {
        color: ${globalColors.orangeMain};
        font-weight: 600;
        display: block;
        padding: 0 0 8px;
      }

      @media ${device.mobile} {
        margin: 32px 0px 32px 22px;
        font-size: 13px;
        line-height: 21px;
      }
    }

    kbd {
      display: inline-block;
      padding: 0.2em 0.3em;
      border-radius: .2em;
      line-height: 1em;
      background-color: ${globalColors.whiteHover};
      font-family: 'Courier New', monospace;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(85, 85, 85, 0.35);
      margin: 0.2em 0.1em;
      color: #000;
    }

    .shortcut_variants {
      margin: 20px 0 !important;
      padding: 0 !important;

      .shortcut_toggle {
          display: inline-block;
          margin-right: 20px;
          margin-left: 0 !important;
          padding: 0;
          list-style-type: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          text-transform: capitalize;
          &.disabled {
            color: #b2b2b2;
        }
      }
    }

    .sysreq_title {
      display: inline;
      font-weight: 600;
      padding-right: 4px;

      &:after {
        content: ":";
        display: inline;
      }
    }

    .sysreq_descr {
      display: inline;
    }

    .bringattention {
      background-color: #f1da92;
      padding: 15px 30px;
      margin: 10px 0 20px;
      line-height: 1.3em;
      border-radius: 2px;
      -moz-border-radius: 2px;
      -webkit-border-radius: 2px;

      .close_cross {
        font-size: 26px;
        float: right;
        margin: -5px -5px 0 0;
        padding: 5px;
        cursor: pointer;
      }

      strong {
        font-weight: 400;
        font-size: 18px;
        color: ${globalColors.orangeLetters};
        display: block;
        margin-bottom: 10px;
      }

      #newstrDate, #moduleTotalCount {
        font-weight: 600;
      }

      .input_never_show {
        display: flex;
        gap: 8px;
        vertical-align: middle;
        padding: 20px 0 10px;
      }

      table.talk_pages.languages_list_table th.header span {
        &::before, &::after {
          display: none;
        }
      }
    }

    /* spans */
    span.yes {
      background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/faq_check_icons.react.svg");
      background-repeat: no-repeat;
      background-position: 100% 0;
      content: "";
      display: inline-block;
      height: 24px;
      margin-top: -4px;
      position: relative;
      width: 24px;
      vertical-align: middle;
    }

    span.no {
      background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/faq_check_icons.react.svg");
      background-repeat: no-repeat;
      background-position: -48px 0;
      content: "";
      display: inline-block;
      height: 24px;
      margin-top: -4px;
      position: relative;
      width: 24px;
      vertical-align: middle;
    }

    span {
      &.new_language:after, &.comsoon:after, &.newarticle:after { 
        display: inline-block;
        padding: 0 4px;
        color: ${globalColors.white};
        font-size: 10px;
        font-weight: 300;
        vertical-align: middle;
        margin: 0 0 0 6px;
        text-transform: top;
        line-height: 1.5em;
      }
    }

    span.new_language:after {
      content: "recently added";
      background-color: ${globalColors.green};
    }

    span.comsoon:after {
      margin: 0 0 0 23px;
      line-height: 1.3em;
      font-size: 9px;
      content: "soon";
      background-color: #999;
      white-space: nowrap;
    }

    span.iptoggler, span.toggler {
      border-bottom: 1px dotted ${globalColors.gray};
      cursor: pointer;
      width: fit-content;
    }

    span.iphidecont {
      display: none;
    }

    div.ipcontents {
      display: none;
    }

    div.inpage-toggler {
      text-align: -webkit-right;
    }

    .block-editor, .block_of_step .inpage-toggler, .MainHelpCenter .inpage-toggler {
      padding: 8px 0 0;

      span.toggler {
        left: 0;
        right: auto;
        top: 10px;
      }
    }

    summary {
      cursor: pointer;
      ::marker {
        color: ${globalColors.orangeMain};
        cursor: pointer;
      }
    }

    /* links */
    a {
      display: inline-flex;
      align-items: center;
      color: ${globalColors.orangeMain};
      text-decoration: none;
      font-weight: 400;

      span {
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }

        h1, h2, h3, h4, h5 {
          color: ${globalColors.orangeMain};

          &:hover {
            cursor: pointer;
          }
        }
      }

      > b {
        font-weight: 400;
      }
      
      img {
        margin-right: 8px;
      }

      &.bold {
        font-weight: 600;
      }

      &:hover {
        text-decoration: underline;
      }

      &:visited {
        color: ${globalColors.orangeMain};
      }
    }

    /* headings */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 600;
      margin: 0 0 24px;
      letter-spacing: -0.02em;
      line-height: 1.33em;

      @media ${device.mobile} {
        margin: 0 0 16px;
      }
    }

    h3 {
      font-size: 24px;
    }

    h4 {
      font-size: 18px;

      &.small_size {
        font-size: 16px;
      }

      @media ${device.mobile} {
        font-size: 16px;
      }
    }

    h5 {
      font-size: 14px;

      @media ${device.mobile} {
        font-size: 13px;
      }
    }

    h6 {
      font-size: 14px;
    }

    /* code */
    .prettyprint, pre {
      padding: 2px;
      background: #f4f4f4;
      font-family: "Roboto Mono", Menlo, "Bitstream Vera Sans Mono",
        "DejaVu Sans Mono", Monaco, Consolas, monospace;
      border: 0;
      font-size: 14px;
      margin: 24px 0;
      line-height: 18px;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: auto;

      > code {
        position: relative;
        white-space: pre-wrap;
        display: block;
        line-height: 18px;
        padding: 14px 24px 14px 14px;
        text-align: left;
        font-size: 13px;
        font-weight: 400;
        background: #f4f4f4;

        .copy-code-btn {
          position: absolute;
          top: 0;
          right: 0;
          border: none;
          padding: 0;
          width: 24px;
          height: 24px;
          background-image: url(${copyIcon.src});
          background-repeat: no-repeat;
          background-size: 12px 12px;
          background-position: center;
          background-color: transparent;
          cursor: pointer;
        }

        span {
          margin: 0;
          padding: 0;
        }

        > .pln {
          color: ${globalColors.grayTextInput};
        }

        > .pun {
          color: #660;
        }

        > .lit {
          color: #066;
        }

        > .str {
          color: #080;
        }

        > .kwd {
          color: #008;
        }
      }

      @media ${device.laptop} {
        margin: 16px 0;
        font-size: 13px;
        line-height: 20px;
      }
    }

    code {
      background: #f4f4f4;
      font-family: "Roboto Mono", Consolas, Monaco, "Andale Mono", monospace;
      padding: 1px 5px;
      word-break: break-all;
    }

    pre {
      white-space: break-spaces;
    }

    /* images */
    .screen_block {
      margin: 24px 0;

      @media ${device.mobile} {
        margin: 16px 0;
      }
    }

    img.screen_guides {
      cursor: pointer;
      display: inline-block;
      height: auto;
      position: relative;
      width: 352px;

      @media ${device.laptop} {
        display: none;
      }
    }

    img {
      max-width: -webkit-fill-available;
      vertical-align: middle;
      width: initial;
    }

    img.width-content {
      width: 100%;
    }

    img.bigphoto_screen {
      display: none;

      @media ${device.laptop} {
        display: block;
        width: 100%;
      }
    }

    img.floatleft {
      float: left;
    }

    /* inputs */
    input {
      display: none;
    }

    input[type="checkbox"] {
      display: block;
    }

    input[type="radio"] {
      vertical-align: text-bottom;
    }

    input+label {
      background: #eee;
      border: 1px solid #999;
      border-radius: 4px 4px 0 0;
      display: inline-block;
      padding: 4px 12px;
      position: relative;
      top: 1px;
      cursor: pointer;
    }

    input:checked+label {
      background: ${globalColors.white};
      border-bottom: 1px solid transparent;
    }

    input~.tab {
      border-top: 1px solid #999;
      padding: 12px;
    }

    input~.tab {
      display: none;
    }

    #tab1:checked~.tab.content1, #tab2:checked~.tab.content2, #tab3:checked~.tab.content3, #tab4:checked~.tab.content4, #tab5:checked~.tab.content5, #tab6:checked~.tab.content6, #tab7:checked~.tab.content7 {
      display: block;
    }

    /* languages */
    .locale_lng {
      display: inline-block;
      padding: 0;
      min-height: 12px;

      &:before {
        display: inline-block;
        content: "";
        width: 16px;
        height: 16px;
        background-image: url("https://static-helpcenter.onlyoffice.com/images/flags/flags_all.png");
        background-repeat: no-repeat;
        background-size: 256px 240px;
        vertical-align: middle;
        margin: 0 7px 3px 5px;
      }

      &.language_Lt-az-AZ:before {
        background-position: 0 -16px;
      }

      &.language_en-US:before {
        background-position: -223px -208px;
      }
      &.language_en-UK:before {
        background-position: -159px -64px;
      }

      &.language_vi-VN:before {
        background-position: -96px -224px;
      }

      &.language_el-GR:before {
        background-position: -64px -80px;
      }

      &.language_es-ES:before, &.language_gl-ES:before, &.language_eu-ES:before {
        background-position: 0 -64px;
      }

      &.language_ca-ES:before {
        background-position: -240px -224px;
      }

      &.language_it-IT:before {
        background-position: -128px -96px;
      }

      &.language_lo-LA:before {
        background-position: -128px -112px;
      }

      &.language_ms-MY:before {
        background-position: -128px -144px;
      }

      &.language_zh-TW:before {
        background-position: -159px -208px;
      }

      &.language_zh-CN:before {
        background-position: -207px -32px;
      }

      &.language_ko-KR:before {
        background-position: -64px -112px;
      }

      &.language_lv-LV:before {
        background-position: -16px -128px;
      }

      &.language_de-DE:before {
        background-position: -80px -48px;
      }

      &.language_pl-PL:before {
        background-position: -207px -160px;
      }

      &.language_pt-BR:before {
        background-position: -223px -16px;
      }

      &.language_pt-PT:before {
        background-position: -16px -176px;
      }

      &.language_ru-RU:before {
        background-position: -112px -176px;
      }

      &.language_ar-SA:before {
        background-position: -143px -176px;
      }

      &.language_tr-TR:before {
        background-position: -112px -208px;
      }

      &.language_uk-UA:before {
        background-position: -191px -208px;
      }

      &.language_fi-FI:before {
        background-position: -48px -64px;
      }

      &.language_fr-FR:before {
        background-position: -128px -64px;
      }

      &.language_cs-CZ:before {
        background-position: -64px -48px;
      }

      &.language_ja-JP:before {
        background-position: -191px -96px;
      }

      &.language_sq-AL:before {
        background-position: -96px 0;
      }

      &.language_ar-TN:before {
        background-position: -80px -208px;
      }

      &.language_ar-AE:before {
        background-position: -32px 0;
      }

      &.language_hy-AM:before {
        background-position: -112px 0;
      }

      &.language_af-ZA:before {
        background-position: -191px -224px;
      }

      &.language_be-BY:before {
        background-position: -32px -32px;
      }

      &.language_bg-BG:before {
        background-position: -96px -16px;
      }

      &.language_bs-BA:before {
        background-position: -16px -16px;
      }

      &.language_hu-HU:before {
        background-position: -223px -80px;
      }

      &.language_ka-GE:before {
        background-position: -191px -64px;
      }

      &.language_da-DK:before {
        background-position: -112px -48px;
      }

      &.language_he-IL:before {
        background-position: -32px -96px;
      }

      &.language_id-ID:before {
        background-position: 0 -96px;
      }

      &.language_is-IS:before {
        background-position: -112px -96px;
      }

      &.language_kk-KZ:before {
        background-position: -112px -112px;
      }

      &.language_lt-LT:before {
        background-position: -240px -112px;
      }

      &.language_mk-MK:before {
        background-position: -160px -128px;
      }

      &.language_mn-MN:before {
        background-position: -207px -128px;
      }

      &.language_nl-NL:before {
        background-position: 0 -160px;
      }

      &.language_nb-NO:before {
        background-position: -16px -160px;
      }

      &.language_ro-RO:before {
        background-position: -80px -176px;
      }

      &.language_Cy-sr-SP:before, &.language_Lt-sr-SP:before {
        background-position: -96px -176px;
      }

      &.language_si-LK:before {
        background-position: -191px -112px;
      }

      &.language_sk-SK:before {
        background-position: -16px -192px;
      }

      &.language_sl-SI:before {
        background-position: 0 -192px;
      }

      &.language_sw-KE:before {
        background-position: -207px -96px;
      }

      &.language_th-TH:before {
        background-position: 0 -208px;
      }

      &.language_Cy-uz-UZ:before {
        background-position: 0 -224px;
      }

      &.language_fa-IR:before {
        background-position: -96px -96px;
      }

      &.language_hi-IN:before {
        background-position: -64px -96px;
      }

      &.language_hr-HR:before {
        background-position: -191px -80px;
      }

      &.language_sv-SE:before {
        background-position: -207px -176px;
      }

      &.language_et-EE:before {
        background-position: -191px -48px;
      }

      &.language_es-AR:before {
        background-position: -160px 0;
      }

      &.language_my-MM:before {
        background-position: -191px -128px;
      }

      &.language_tg-Cyrl-TJ:before {
        background-position: -16px -208px;
      }
    }

    /* styles classes */
    .without_padding {
      padding: 0 !important;
    }

    .without_margin {
      margin: 0 !important;
    }

    .pb16 {
      padding-bottom: 16px;
    }

    .pb8 {
      padding-bottom: 8px;
    }

    .pt16 {
      padding-top: 16px;
    }

    .pt8 {
      padding-top: 8px;
    }
    
    .mb16 {
      margin-bottom: 16px;
    }

    .mb8 {
      margin-bottom: 8px;
    }

    .mt16 {
      margin-top: 16px;
    }

    .mt8 {
      margin-top: 8px;
    }

    .fq_expand,
    .fq_collapse {
      display: inline-block;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 22px;
      color: ${globalColors.orangeMain};
      text-decoration: underline;
      cursor: pointer;

      span {
        pointer-events: none;
      }

      &:hover {
        text-decoration: none;
      }

      @media ${device.mobile} {
        font-size: 13px;
        line-height: 20px;
      }
    }

    .fq_collapse {
      display: none;
    }

    .faq_block {
      border-top: 1px solid #E5E5E5;
      margin: 0;
      padding: 32px 0;
      color: ${globalColors.gray};

      &:last-child {
        border-bottom: 1px solid #E5E5E5;
      }

      dt {
        display: flex;
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: -0.02em;
        cursor: pointer;

        &:before {
          content: url("https://static-helpcenter.onlyoffice.com/images/icons/plus.react.svg");
          display: inline-block;
          margin-right: 10px;
          width: 24px;
          height: 24px;
        }

        &.active {
          &:before {
            content: url("https://static-helpcenter.onlyoffice.com/images/icons/minus.react.svg");
          }
        }

        @media ${device.mobile} {
          font-size: 16px;
          line-height: 21px;
        }
      }

      dd {
        margin: 0 0 0 34px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s;

        p {
          &:first-child {
            margin-top: 16px;
          }
        }
      }

      @media ${device.mobile} {
        padding: 24px 0;
      }
    }

    img[target] {
        @media ${device.mobile} {
        width: 100%;
      }
    }

    @media ${device.mobile} {
      font-size: 13px;
      line-height: 20px;
    }
  }
`;

export default StyledRawHtml;