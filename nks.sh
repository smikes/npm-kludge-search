  _nks_completion () {
    local si="$IFS"
    IFS=$'\n' COMPREPLY=($(COMP_CWORD="$COMP_CWORD" \
                           COMP_LINE="$COMP_LINE" \
                           COMP_POINT="$COMP_POINT" \
                           _nks_complete_packages "$2"
                           2>/dev/null)) || return $?
    IFS="$si"
  }
  alias foo=echo
  complete -F _nks_completion foo

  _nks_complete_packages () {
      npm-kludge-search --complete "$1" 2>/dev/null
  }
